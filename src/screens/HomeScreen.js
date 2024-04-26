import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View, Text } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Go to Item List"
        onPress={() => navigation.navigate("Item List")}
      />
    </View>
  );
};

export default HomeScreen;
