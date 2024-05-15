import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { Button, View, TouchableWithoutFeedback, Keyboard } from "react-native";

import FolderCreationModal from "../components/FolderCreationModal";
import ItemForm from "../components/ItemForm";

//TODO: Change selectedFolderId!
const AddNewScreen = () => {
  const navigation = useNavigation();
  const [navigatedFolderId, setNavigatedFolderId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(
    "M2UsMeNZ6X1O8qWJoT80"
  );
  const [folderStructure, setFolderStructure] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); //ToDo: add something here?

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FolderCreationModal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          parentFolder={selectedFolderId}
          onAdded={() => setModalVisible(false)}
        />
        <ItemForm />
        <Button
          title="Add new"
          onPress={() =>
            navigation.navigate("Item", { folderId: navigatedFolderId })
          }
        />
        <Button title="Add new folder" onPress={() => setModalVisible(true)} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddNewScreen;
