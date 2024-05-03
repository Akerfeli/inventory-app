import { useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";
import { Spacing } from "../globalStyles";

const ItemListScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: Spacing.m,
        backgroundColor: "white",
      }}
    >
      <Breadcrumbs
        currentScreenTitle={title}
        previousScreenTitle={previousScreenTitle}
      />
      <FolderContent folderId={1} />
    </View>
  );
};

export default ItemListScreen;
