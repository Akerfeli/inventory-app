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
  const [selectedFolderId, setSelectedFolderId] = useState(
    "M2UsMeNZ6X1O8qWJoT80"
  );
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
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
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
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddNewScreen;
