import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { Colors, Styles } from "../globalStyles";

const CustomTextInput = ({
  value,
  onChangeText,
  label = "",
  placeholder = "",
  error = "",
  rows = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View styles={styles.container}>
      <Text style={[Styles.textLabel]}>{label ? label : null}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        multiline={rows > 1}
        style={[
          styles.textInput,
          isFocused ? styles.inputOnFocus : styles.inputOnBlur,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Text style={styles.errorText}>{error ? error : null}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  textInput: {
    padding: 10, // ToDo: height = rows*something?
    backgroundColor: "white",
    fontSize: 16,
    borderRadius: 16,
    height: 40,
    borderWidth: 2,
    marginBottom: 4,
  },
  inputOnFocus: {
    borderColor: Colors.secondary, // Change border color when focused
  },
  inputOnBlur: {
    borderColor: "white",
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
  },
});
export default CustomTextInput;
