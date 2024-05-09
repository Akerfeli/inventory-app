import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";

import AmountButton from "./AmountButton";

const ObjectListItem = ({ item, itemId, onEditPressed, changeAmount }) => {
  const renderLeftContainer = () => {
    return (
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <Text style={styles.description}>{item.name}</Text>
        </View>
      </View>
    );
  };

  const renderRightContainer = () => {
    return (
      <View style={[styles.rightContainer]}>
        <AmountButton
          amount={item.amount}
          changeAmount={(newAmount) => changeAmount(itemId, newAmount)}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => onEditPressed(itemId)}>
      <View style={styles.container}>
        {renderLeftContainer()}
        {renderRightContainer()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#aaa",
    width: 56,
    height: 56,
  },
  textContainer: {
    flexDirection: "column",
    gap: 4,
  },
  label: {
    fontWeight: "bold",
  },
  description: {
    color: "#bbb",
  },
});

export default ObjectListItem;
