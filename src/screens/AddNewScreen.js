import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { Button, View, Text, Modal } from "react-native";

import FolderCreationModal from "../components/FolderCreationModal";

const AddNewScreen = () => {
  const navigation = useNavigation();
  const [navigatedFolderId, setNavigatedFolderId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [folderStructure, setFolderStructure] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // On focus, update navigatedFolderId
  useFocusEffect(
    // ToDo: If folder structure is not auto updated with subscription, fetch it again here.

    useCallback(() => {
      const navigationState = navigation.getState();
      const homeStackState = navigationState.routes.find(
        (route) => route.name === "HomeStack"
      )?.state;

      if (homeStackState) {
        const reversedRoutes = [...homeStackState.routes].reverse();

        // Find the latest "Item Folder" route
        const latestItemFolderRoute = reversedRoutes.find(
          (route) => route.name === "Item Folder"
        );

        const folderId = latestItemFolderRoute?.params?.folderId;
        setNavigatedFolderId(folderId);
      } else {
        setNavigatedFolderId(null);
      }
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FolderCreationModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <Text>Add new</Text>
      <Button
        title="Add new"
        onPress={() =>
          navigation.navigate("Item", { folderId: navigatedFolderId })
        }
      />
      <Button title="Add new folder" onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default AddNewScreen;
