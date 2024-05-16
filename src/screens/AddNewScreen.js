import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import FolderCreationModal from "../components/FolderCreationModal";
import ItemForm from "../components/ItemForm";
import { createItem } from "../services/firebaseService";

//TODO: Change selectedFolderId!
const AddNewScreen = () => {
  const navigation = useNavigation();
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialFormData, setInitialFormData] = useState({}); //ToDo: add something here?
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resetForm, setResetForm] = useState(null);

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
        setSelectedFolderId(folderId);
      } else {
        setSelectedFolderId(null);
      }
    }, [navigation])
  );

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await createItem(formData);

      // Set a timeout to reset the state after three seconds
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);

      setSuccessMessage("Item added successfully!");
    } catch (error) {
      console.log("Error when creating item:", error);
      setErrorMessage(
        "An error occurred while adding the item. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback, if loading
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (errorMessage || successMessage) {
    return (
      <View style={styles.centerContainer}>
        <Text>{errorMessage ? errorMessage : successMessage}</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 24,
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
          onSubmit={handleSubmit}
          resetForm={resetForm}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddNewScreen;
