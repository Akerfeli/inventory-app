import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import useNavigation hook
import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { Input } from "react-native-elements";

import { useAuth } from "../contexts/AuthContext";

const SignInScreen = () => {
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Reset error state when the screen is focused, so if we go to
  // Sign In -> Sign Up -> Sign In again there arent any error messages lingering

  useEffect(() => {
    setShowEmailError(false);
    setShowPasswordError(false);
  }, [isFocused]);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      setShowEmailError(email === "");
      setShowPasswordError(password === "");
      return;
    }

    try {
      await signIn(email, password);
      console.log("User signed in with email: ", email);
    } catch (error) {
      console.log(error);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/too-many-requests"
      ) {
        setShowEmailError(email === "");
        setShowPasswordError(password === "");
        alert("The user doesn't exist or the password is wrong.");
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
      <Button title="Login" onPress={() => handleSignIn()} />
      <Button title="Sign Up" onPress={() => handleSignUp()} />
    </View>
  );
};

export default SignInScreen;
