import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState();

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
          title="Go to Item Screen"
          onPress={() => navigation.navigate("Item")}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
