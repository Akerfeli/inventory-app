import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Text } from "react-native-elements";
import PasswordStrengthMeterBar from "react-native-password-strength-meter-bar";

import { useAuth } from "../contexts/AuthContext";
import { Colors, Styles } from "../globalStyles";
import { validateSignInSignUp } from "../utils/validation";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordActive, setPasswordActive] = useState(false);
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
    <View style={Styles.container}>
      <Text style={[Styles.heading, { textAlign: "center", padding: 15 }]}>
        Create your account!
      </Text>
      <Input
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon" }}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        errorMessage={
          <Text style={{ color: Colors.textError }}>{errors.email}</Text>
        }
        inputStyle={Styles.textPrimary}
      />

      <Input
        placeholder="Password"
        leftIcon={{ name: "lock-closed", type: "ionicon" }}
        onChangeText={(text) => setPassword(text)}
        onFocus={() => setPasswordActive(true)}
        autoCapitalize="none"
        secureTextEntry={true}
        errorMessage={
          <Text style={{ color: Colors.textError }}>{errors.password}</Text>
        }
        inputStyle={Styles.textPrimary}
      />
      <PasswordStrengthMeterBar
        password={password}
        unfilledColor={Colors.bgSecondary}
      />
      <TouchableOpacity
        style={[Styles.primaryButton, { marginTop: passwordActive ? 10 : 0 }]}
        onPress={() => handleSignUp()}
      >
        <Text style={Styles.primaryButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
