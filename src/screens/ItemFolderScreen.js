import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";
import FolderCreationModal from "../components/FolderCreationModal";
import FolderMenu from "../components/FolderMenu";
import { Colors } from "../globalStyles";
import useFetch from "../hooks/useFetch";
import useFlattenFolderContent from "../hooks/useFlattenFolderContent";
import { getFolderContentById } from "../services/firebaseService";

const ItemFolderScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title, folderId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

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
        padding: 4,
      }}
    >
      <FolderCreationModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        parentFolder={folderId}
        onAdded={() => setModalVisible(false)}
      />
      <Breadcrumbs
        currentScreenTitle={title}
        previousScreenTitle={previousScreenTitle}
      />
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FolderMenu
            folderName={title}
            onAddFolderPressed={() => setModalVisible(true)}
          />
          <FolderContent folderData={flatContent} folderName={title} />
        </>
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
