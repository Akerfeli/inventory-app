import { CheckBox } from "@rneui/themed";
import React from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";

import AmountButton from "./AmountButton";
import { Colors } from "../globalStyles";
import { editItem } from "../services/firebaseService";

const ObjectListItem = ({ item, onEditPressed, changeAmount }) => {
  const renderLeftContainer = () => {
    return (
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {/*ToDo: fix indentation which currently adds a space to the description text*/}
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const handleFavoritePressed = async () => {
    try {
      await editItem(item.id, item.parentId, {
        favoriteList: !item.favoriteList,
      });
    } catch (error) {
      console.log(
        "An error occurred when changing value for favoriteList in item:",
        error
      );
    }
  };

  const renderRightContainer = () => {
    return (
      <View style={[styles.rightContainer]}>
        <AmountButton
          amount={item.amount}
          changeAmount={(newAmount) => changeAmount(item.id, newAmount)}
        />
        <CheckBox
          checked={item.favoriteList}
          checkedIcon="heart"
          uncheckedIcon="heart-o"
          checkedColor={Colors.accent}
          onPress={handleFavoritePressed}
          containerStyle={{ padding: 0, marginRight: 4, marginLeft: 16 }}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => onEditPressed(item.id)}>
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
    paddingVertical: 12,
    paddingHorizontal: 4,
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
    backgroundColor: Colors.tertiary,
    width: 56,
    height: 56,
  },
  textContainer: {
    flexDirection: "column",
    maxWidth: "70%",
  },
  label: {
    fontWeight: "bold",
  },
  description: {
    color: "#bbb",
    fontSize: 14,
    overflow: "hidden",
    height: 40,
  },
});

export default ObjectListItem;
