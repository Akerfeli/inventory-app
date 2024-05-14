import React from "react";
import { View, Text } from "react-native";

import CategorySelection from "../components/CategorySelection";

const FavoritesScreen = () => {
  const handleCategorySelect = (category) => {
    console.log("Selected category:", category);
  };

  return (
    <View>
      <CategorySelection onSelectCategory={handleCategorySelect} />
    </View>
  );
  /*
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Favorites</Text>
    </View>
  );*/
};

export default FavoritesScreen;
