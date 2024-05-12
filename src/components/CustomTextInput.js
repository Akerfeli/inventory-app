import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

import { Colors } from "../globalStyles";

const CustomTextInput = ({
  value,
  onChangeText,
  label = "",
  placeholder = "",
  error = "",
  rows = 1,
}) => {
  return (
    <View styles={styles.container}>
      <Text style={styles.labelText}>{label ? label : null}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        multiline={rows > 1}
        style={styles.textInput}
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
  },
  labelText: {
    fontWeight: "bold",
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
  },
});

export default CustomTextInput;
