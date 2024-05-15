import { useRoute } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import useFlattenFolderContent from "../hooks/useFlattenFolderContent";
import { getFolderContentById } from "../services/firebaseService";

const ItemFolderScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title, folderId } = route.params;

  const { userState } = useAuth();
  const {
    data: folderData,
    isLoading,
    error,
  } = useFetch({
    firebaseFunction: () => getFolderContentById(folderId),
  });
  const flatContent = useFlattenFolderContent(folderData);

  /*const [mockData, setMockData] = useState({
    id: 0,
    name: "Folder 1",
    items: [
      { id: "1", name: "Object a", amount: 1, description: " Description 1" },
      {
        id: "2",
        name: "Object c",
        amount: 2,
        description: " Description 2 is a very long description for testing. ",
      },
      { id: "3", name: "Object b", amount: 3, description: "" },
    ],
    subfolders: [
      { id: "subfolder1", name: "Subfolder 2" },
      { id: "subfolder2", name: "Subfolder 1" },
    ],
  });*/

  /*// Flatten the data
  const flatData = useMemo(() => {
    const flatArray = mockData.subfolders
      .map((subfolder) => ({ ...subfolder, type: "folder" }))
      .concat(mockData.items.flatMap((obj) => ({ ...obj, type: "object" })));
    return flatArray;
  }, [mockData]);*/

  console.log(folderData);

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
        <FolderContent folderData={flatContent} folderName={folderData?.name} />
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
