import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";

import { auth } from "../../firebaseConfig";
import useFetch from "../hooks/useFetch";
import { createRootFolder } from "../services/firebaseService";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    id: "",
    email: "",
    isSignedIn: false,
  });

  // Function to store user authentication state
  const storeUserState = async (userState) => {
    try {
      await AsyncStorage.setItem("userState", JSON.stringify(userState));
    } catch (error) {
      console.error("Error storing user state:", error);
    }
  };

  // Function to retrieve user authentication state
  const retrieveUserState = async () => {
    try {
      const storedUserState = await AsyncStorage.getItem("userState");
      if (storedUserState !== null) {
        setUserState(JSON.parse(storedUserState));
      }
    } catch (error) {
      console.error("Error retrieving user state:", error);
    }
  };

  useEffect(() => {
    retrieveUserState(); // Retrieve stored user state on app launch
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredentials.user;
      const newUserState = {
        id: user.uid,
        email: user.email,
        isSignedIn: true,
      };
      setUserState(newUserState);
      await storeUserState(newUserState); // Store user state
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredentials.user;
      const newUserState = {
        id: user.uid,
        email: user.email,
        isSignedIn: true,
      };
      setUserState(newUserState);
      await storeUserState(newUserState); // Store user state
      createRootFolder(user.uid);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUserState((prevState) => ({
        ...prevState,
        id: "",
        email: "",
        isSignedIn: false,
      }));
      await AsyncStorage.removeItem("userState"); // Remove stored user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
