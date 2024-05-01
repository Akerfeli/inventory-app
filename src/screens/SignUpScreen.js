import React, { useState } from "react";
import { View, Button } from "react-native";
import { Input } from "react-native-elements";

import { useAuth } from "../contexts/AuthContext";

const SignUpScreen = () => {
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    if (email === "" || password === "") {
      console.log(email);
      console.log(password);
      setShowEmailError(email === "");
      setShowPasswordError(password === "");
      return;
    }
    try {
      await signUp(email, password);
      console.log("User created with email:", email);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View>
      <Input
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon" }}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        errorMessage={
          showEmailError
            ? "Cannot be empty, and a valid gmail adress with @ is required."
            : null
        }
      />

      <Input
        placeholder="Password"
        leftIcon={{ name: "lock-closed", type: "ionicon" }}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry={true}
        errorMessage={showPasswordError ? "Cannot be empty" : null}
      />
      <Button title="Create account" onPress={() => handleSignUp()} />
    </View>
  );
};

export default SignUpScreen;
