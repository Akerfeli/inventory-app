import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import FolderCreationModal from "../components/FolderCreationModal";
import ItemForm from "../components/ItemForm";

//TODO: Change selectedFolderId!
const AddNewScreen = () => {
  const navigation = useNavigation();
  const [navigatedFolderId, setNavigatedFolderId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); //ToDo: add something here?

  // On focus, update navigatedFolderId
  useFocusEffect(
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
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 24,
        }}
        overScrollMode="never"
      >
        <FolderCreationModal
          modalVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          parentFolder={selectedFolderId}
          onAdded={() => setModalVisible(false)}
        />
        <ItemForm
          onAddFolderPressed={() => setModalVisible(true)}
          selectedFolderId={selectedFolderId}
          setSelectedFolderId={setSelectedFolderId}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddNewScreen;
