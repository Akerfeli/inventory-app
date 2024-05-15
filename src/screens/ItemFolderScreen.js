import { useRoute } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";
import useFetch from "../hooks/useFetch";
import useFlattenFolderContent from "../hooks/useFlattenFolderContent";
import { getFolderContentById } from "../services/firebaseService";

const ItemFolderScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title, folderId } = route.params;

  const {
    data: folderData,
    isLoading,
    error,
  } = useFetch({
    firebaseFunction: () => getFolderContentById(folderId),
  });
  const flatContent = useFlattenFolderContent(folderData);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        backgroundColor: "white",
      }}
    >
      <Breadcrumbs
        currentScreenTitle={title}
        previousScreenTitle={previousScreenTitle}
      />
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FolderContent folderData={flatContent} folderName={title} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ItemFolderScreen;
