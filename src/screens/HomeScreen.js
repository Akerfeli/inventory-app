import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState();
  const { signOut } = useAuth();

  const updateSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        platform="android"
        placeholder="Search"
        onChangeText={updateSearch}
        value={searchQuery}
        containerStyle={{
          borderRadius: 30,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
        searchIcon={{ name: "search", type: "ionicon" }}
        leftIconContainerStyle={{ paddingLeft: 8 }}
        rightIconContainerStyle={{ paddingRight: 8 }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home</Text>
        <Button
          title="Go to Item Folder"
          onPress={() =>
            navigation.navigate("Item Folder", { depth: 1, title: "Test" })
          }
        />
        <Button title="Logout" onPress={() => signOut()} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
