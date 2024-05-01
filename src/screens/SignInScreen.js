import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, View } from "react-native";
import { Input } from "react-native-elements";

import { auth } from "../../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      signIn();
      console.log("User signed in with email: ", user.email);
    } catch (error) {
      alert("Sign in failed");
      console.log(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      signIn(true);
      console.log("User created with email:", user.email);
    } catch (error) {
      alert("Creating account failed");
      console.log("Sign up failed" + error.message);
    }
  };

  return (
    <View>
      <Input
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon" }}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Password"
        leftIcon={{ name: "lock-closed", type: "ionicon" }}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => handleSignIn()} />
      <Button title="Create account" onPress={() => handleSignUp()} />
    </View>
  );
};

export default SignInScreen;
