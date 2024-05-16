import { useRoute } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";
import FolderCreationModal from "../components/FolderCreationModal";
import FolderMenu from "../components/FolderMenu";
import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../globalStyles";
import useFetch from "../hooks/useFetch";
import useFlattenFolderContent from "../hooks/useFlattenFolderContent";
import { getFolderContentById } from "../services/firebaseService";
import { getItems, getSubFolders } from "../services/firebaseNewService";
import useNewFetch from "../hooks/useNewFetch";

const ItemFolderScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title, folderId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const { userState } = useAuth();

  const params = [folderId];
  const {
    data: dataItems,
    isLoading: isLoadingItems,
    error: errorItems,
  } = useNewFetch(getItems, params);
  const {
    data: dataSubfolders,
    isLoading: isLoadingSubfolders,
    error: errorSubfolders,
  } = useNewFetch(getSubFolders, params);

  const isLoading = isLoadingItems || isLoadingSubfolders;

  const flatContent = useMemo(() => {
    if (isLoading || !dataSubfolders || !dataItems) {
      return null;
    }

    const flatArray = dataSubfolders
      .map((subfolder) => ({ ...subfolder, type: "folder" }))
      .concat(dataItems.map((obj) => ({ ...obj, type: "object" })));

    return flatArray;
  }, [dataItems, dataSubfolders, isLoading]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
