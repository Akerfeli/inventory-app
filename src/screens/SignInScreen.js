import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import useNavigation hook
import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";

import BirdLogo from "../../assets/bird-logo.png";
import { useAuth } from "../contexts/AuthContext";
import { Colors, Styles } from "../globalStyles";
import { validateSignInSignUp } from "../utils/validation";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Reset error state when the screen is focused, so if we go to
  // Sign In -> Sign Up -> Sign In again there arent any error messages lingering,
  // If the user writes something in sign in that will persist

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
    <View style={[Styles.container, Styles.centerItemsContainer]}>
      <Image
        source={BirdLogo}
        style={{ width: 200, height: 200, margin: 10, marginBottom: 20 }}
      />
      <Text style={[Styles.heading, { fontSize: 20 }]}>NestKeep</Text>
      <Input
        placeholder="email@adress.com"
        leftIcon={{ name: "mail", type: "ionicon", color: Colors.heading }}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        errorMessage={
          <Text style={{ color: Colors.textError }}>{errors.email}</Text>
        }
        inputStyle={Styles.textPrimary}
      />

      <Input
        placeholder="Password"
        leftIcon={{
          name: "lock-closed",
          type: "ionicon",
          color: Colors.heading,
        }}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry={true}
        errorMessage={
          <Text style={{ color: Colors.textError }}>{errors.password}</Text>
        }
        inputStyle={Styles.textPrimary}
      />
      <TouchableOpacity style={Styles.primaryButton} onPress={handleSignIn}>
        {/* Customized button text */}
        <Text style={Styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSignUp()}>
        <Text style={[Styles.textLink, { marginVertical: 8 }]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
