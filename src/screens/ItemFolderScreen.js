import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Button, View, Text } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";

const ItemListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { depth, previousScreenTitle } = route.params;

  const handleNextFolder = () => {
    navigation.push("Item Folder", {
      depth: depth + 1, // ToDo: Change this to title
      key: `ItemFolder_${depth + 1}`,
      previousScreenTitle: `Folder ${depth}`,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Breadcrumbs
        currentScreenTitle={`Folder ${depth}`}
        previousScreenTitle={previousScreenTitle}
      />
      <Text>{`Folder depth ${depth}`}</Text>
      <Button
        title={`Go to next folder ${depth + 1}`}
        onPress={handleNextFolder}
      />
    </View>
  );
};

export default ItemListScreen;
