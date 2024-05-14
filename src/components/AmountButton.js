import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

const AmountButton = ({ amount, changeAmount }) => {
  const decreaseAmount = () => {
    // Don't allow negative values
    if (amount > 0) {
      changeAmount(amount - 1);
    }
  };

  const cleanInputText = (text) => {
    return text.replace(/[^\d]/g, ""); // Remove all non-numeric characters
  };

  return (
    <View style={[styles.amountContainer, styles.flexEnd]}>
      <TouchableOpacity
        onPress={decreaseAmount}
        style={[styles.buttonContainer, { alignItems: "flex-end" }]}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        value={amount.toString()}
        onChangeText={(text) => {
          const cleanedText = cleanInputText(text);
          const value = cleanedText === "" ? "" : parseInt(cleanedText);
          changeAmount(value);
        }}
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => changeAmount(amount + 1)}
        style={[styles.buttonContainer, { alignItems: "flex-start" }]}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    width: 40 + 24 + 24, //ToDo: maybe we can change it so that we don't need this?
  },
  buttonContainer: {
    height: 36,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  input: {
    textAlign: "center",
    width: 40,
    height: 36,
    fontSize: 16,
  },
});

export default AmountButton;
