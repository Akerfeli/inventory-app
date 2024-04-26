import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View, Text } from "react-native";

const AddNewScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add new</Text>
      <Button title="Add new" onPress={() => navigation.navigate("Item")} />
    </View>
  );
};

export default AddNewScreen;
