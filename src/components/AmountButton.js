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
          const value = parseInt(text);
          if (!isNaN(value)) {
            changeAmount(value >= 0 ? value : 0); // Don't allow negative values
          }
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
    borderColor: "#bbb",
    borderWidth: 1,
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
    minWidth: 40,
    height: 36,
    fontSize: 16,
  },
});

export default AmountButton;
