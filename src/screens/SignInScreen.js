import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import useNavigation hook
import React, { useState, useEffect } from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";

import { useAuth } from "../contexts/AuthContext";
import { validateSignInSignUp } from "../utils/validation";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Reset error state when the screen is focused, so if we go to
  // Sign In -> Sign Up -> Sign In again there arent any error messages lingering

  useEffect(() => {
    setErrors({});
  }, [isFocused]);

  const handleSignIn = async () => {
    if (validateSignInSignUp(email, password, setErrors, false)) {
      try {
        await signIn(email, password);
        console.log("User signed in with email: ", email);
      } catch (error) {
        alert("The user doesn't exist or the password is wrong.");
        console.log(error.message);
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
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
      <Button title="Login" onPress={() => handleSignIn()} />
      <TouchableOpacity onPress={() => handleSignUp()}>
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
