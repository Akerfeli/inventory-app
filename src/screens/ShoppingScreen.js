import { ListItem, CheckBox, Button, Icon } from "@rneui/themed";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import { getItemsToBuy } from "../services/firebaseService";
import { Styles, Colors } from "../globalStyles";
import ObjectListItem from "../components/ObjectListItem";

const ShoppingScreen = () => {
  const { userState } = useAuth();
  const { data, loading, error } = useFetch({
    firebaseFunction: () => getItemsToBuy(userState.id),
  });

  /*
  const mockData = [
    {
      id: "1",
      name: "Milk",
      amount: 1,
      description: "1 liter",
      category: "Dairy",
      ShoppingListStatus: "toBuy",
    },
    {
      id: "2",
      name: "Bread",
      amount: 2,
      description: "Whole wheat",
      category: "Bakery",
      ShoppingListStatus: "toBuy",
    },
    {
      id: "3",
      name: "Apples",
      amount: 3,
      description: "Red apples",
      category: "Fruit",
      ShoppingListStatus: "toBuy",
    },
    {
      id: "4",
      name: "Eggs",
      amount: 12,
      description: "Large eggs",
      category: "Dairy",
      ShoppingListStatus: "completed",
    },
  ];*/

  const removeCompleted = () => {
    //ToDo: removeCompleted
    // maybe we can do a batch edit??
    console.log(`Remove completed`);
  };

  const toggleItemCheck = (itemId, status) => {
    console.log(`Toggle ${itemId}`);
    const newStatus = status === "toBuy" ? "completed" : "toBuy";
    //ToDo: call db to edit item
  };

  const removeItemFromShoppingList = (itemId) => {
    //ToDo: set item to notListed status in db
    console.log(`Remove ${itemId}`);
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
            onPress={() => removeItemFromShoppingList(listItem.item.id)}
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
              checked={item.ShoppingListStatus === "toBuy"}
              onPress={() => toggleItemCheck(item.id, item.ShoppingListStatus)}
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

  if (loading) {
    return null;
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
