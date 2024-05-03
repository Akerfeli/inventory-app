import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Input } from "react-native-elements";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";

import { useAuth } from "../contexts/AuthContext";
import { validateSignInSignUp } from "../utils/validation";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    if (validateSignInSignUp(email, password, setErrors, true)) {
      try {
        // If input is valid, proceed with sign-up
        await signUp(email, password);
        console.log("User created with email:", email);
      } catch (error) {
        // Handle sign-up error
        console.log(error.message);
      }
    }
  };
  return (
    <View>
      <Input
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon" }}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        errorMessage={errors.email}
      />

      <Input
        placeholder="Password"
        leftIcon={{ name: "lock-closed", type: "ionicon" }}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry={true}
        errorMessage={errors.password}
      />
      <PasswordStrengthMeterBar password={password} />
      <Button title="Create account" onPress={() => handleSignUp()} />
    </View>
  );
};

export default SignUpScreen;
