import { CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, View, Text, StyleSheet } from "react-native";

import AmountButton from "./AmountButton";
import { Colors } from "../globalStyles";
import { editItem } from "../services/firebaseService";

const ObjectListItem = ({ item, onEditPressed }) => {
  const [localItem, setLocalItem] = useState(item); // For optimistic updates

  useEffect(() => {
    // Check if the received item is newer than the localItem
    if (!localItem.timestamp || item.timestamp > localItem.timestamp) {
      setLocalItem(item);
    }
  }, [item]);

  const handleChangeAmount = async (newAmount) => {
    const timestamp = Date.now();

    // Optimistic update
    setLocalItem((prevItem) => ({
      ...prevItem,
      amount: newAmount,
      timeChanged: timestamp,
    }));

    try {
      await editItem(item.id, item.parentId, {
        amount: newAmount,
        timeChanged: timestamp,
      });
    } catch (error) {
      console.log(
        "An error occurred when changing value for amount in item:",
        error
      );
    }
  };

  const handleFavoritePressed = async () => {
    const timestamp = Date.now();

    // Optimistic update
    setLocalItem((prevItem) => ({
      ...prevItem,
      favoriteList: !localItem.favoriteList,
      timeChanged: timestamp,
    }));

    try {
      await editItem(item.id, item.parentId, {
        favoriteList: !localItem.favoriteList,
        timeChanged: timestamp,
      });
    } catch (error) {
      console.log(
        "An error occurred when changing value for favoriteList in item:",
        error
      );
    }
  };

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
            {localItem.description}
          </Text>
        </View>
      </View>
    );
  };

  const renderRightContainer = () => {
    return (
      <View style={[styles.rightContainer]}>
        <AmountButton
          amount={localItem.amount}
          changeAmount={handleChangeAmount}
        />
        <CheckBox
          checked={localItem.favoriteList}
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
    <TouchableWithoutFeedback>
      {/*ToDo: implement on press => edit item */}
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
    paddingHorizontal: 8,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 4,
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
