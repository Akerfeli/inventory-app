import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

import { auth } from "../../firebaseConfig";

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

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      setUserState((prevState) => ({
        ...prevState,
        id: user.uid,
        email: user.email,
        isSignedIn: true,
      }));
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      setUserState((prevState) => ({
        ...prevState,
        id: user.uid,
        email: user.email,
        isSignedIn: true,
      }));
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUserState((prevState) => ({
      ...prevState,
      id: "",
      email: "",
      isSignedIn: false,
    }));
  };

  return (
    <AuthContext.Provider value={{ userState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
