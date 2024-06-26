import { ListItem, CheckBox, Button, Icon } from "@rneui/themed";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import ObjectListItem from "../components/ObjectListItem";
import { useAuth } from "../contexts/AuthContext";
import { Styles, Colors } from "../globalStyles";
import useNewFetch from "../hooks/useNewFetch";
import { getItemsToBuy } from "../services/firebaseNewService";
import {
  editItem,
  updateShoppingListStatus,
} from "../services/firebaseService";

const ShoppingScreen = () => {
  const { userState } = useAuth();
  const params = [userState.id];
  const { data, isLoading, error } = useNewFetch(getItemsToBuy, params);

  const removeCompleted = () => {
    const completedItems = [];
    data.forEach((item) => {
      if (item.shoppingListStatus === "completed") {
        completedItems.push(item);
      }
    });
    updateShoppingListStatus(completedItems);
  };

  const toggleItemCheck = (item) => {
    const newStatus =
      item.shoppingListStatus === "toBuy" ? "completed" : "toBuy";
    editItem(item.id, item.parentId, { shoppingListStatus: newStatus });
  };

  const removeItemFromShoppingList = (item) => {
    editItem(item.id, item.parentId, { shoppingListStatus: "notListed" });
  };

  const handleChangeAmount = (itemId, amount) => {
    //ToDo
    console.log(`Change amount ${itemId} to ${amount}`);
  };

  const renderSwipeableItem = (listItem) => {
    // swipe = remove form shopping list
    const item = listItem.item;

    return (
      <ListItem.Swipeable
        rightWidth={176}
        containerStyle={{
          padding: 0,
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
        rightContent={
          <Button
            title="Remove from list"
            onPress={() => removeItemFromShoppingList(item)}
            icon={
              <Icon
                name="playlist-remove"
                type="material-icons"
                color="white"
                size={24}
              />
            }
            buttonStyle={{
              minHeight: "100%",
              backgroundColor: Colors.secondary,
            }}
            titleStyle={{ fontSize: 14 }}
          />
        }
      >
        <View style={styles.listRow}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={item.shoppingListStatus === "completed"}
              onPress={() => toggleItemCheck(item)}
              size={32}
              checkedColor={Colors.primary}
              containerStyle={{
                margin: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ObjectListItem
              item={item}
              itemId={item.id}
              changeAmount={(amount) => handleChangeAmount(item.id, amount)}
            />
          </View>
        </View>
      </ListItem.Swipeable>
    );
  };

  // Fallback, if loading
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  //Fallback if shopping list is empty
  if (!data || data.length === 0) {
    // ToDo: maybe we need && !isLoading?
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>The shopping list is empty.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
      <TouchableOpacity
        style={[
          Styles.primaryButton,
          {
            width: "90%",
            marginTop: 8,
            marginBottom: 8,
            flexDirection: "row",
            gap: 8,
          },
        ]}
        onPress={removeCompleted}
      >
        <Icon
          name="playlist-add-check"
          type="material-icons"
          color="white"
          size={24}
        />
        <Text style={Styles.primaryButtonText}>Remove checked items</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderSwipeableItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
  listRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },
  checkboxContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyListText: {
    color: "#aaa",
  },
});

export default ShoppingScreen;
