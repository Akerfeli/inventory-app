import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, View } from "react-native";
import { Input } from "react-native-elements";

import { auth } from "../../firebaseConfig";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*  const auth = auth; */

  const signIn = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("User signed in: ", user);
    } catch (error) {
      alert("Sign in failed");
      console.log(error.message);
    }
  };

  const signUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log("User created:", user);
    } catch (error) {
      alert("Creating account failed");
      console.log("Sign up failed" + error.message);
    }
  };

  return (
    <View>
      <Input
        /*   label="Your Email Adress" */
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon" }}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        /*    label="Your Password" */
        placeholder="Password"
        leftIcon={{ name: "lock-closed", type: "ionicon" }}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title="login" onPress={() => signIn()} />
      <Button title="Create account" onPress={() => signUp()} />
    </View>
  );
};

export default SignInScreen;
