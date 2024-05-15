import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  Modal,
  StyleSheet,
} from "react-native";

import { Styles, Colors } from "../globalStyles";
import ItemForm from "./ItemForm";

const EditItemModal = ({ modalVisible, itemId, onClose, onAdded }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (modalVisible) {
      // Reset modal state when it becomes visible
      setError("");
      setIsLoading(false);
      setName("");
    }
  }, [modalVisible]);

  useEffect(() => {
    // ToDo: fetch data here or use useFetch?
  }, [itemId]);

  const handleEditItem = () => {
    // ToDo: put item to db here
    // Set loading state
    setIsLoading(true);

    // Simulate async folder creation in db
    setTimeout(() => {
      // If all ok
      // onAdded(newFolderId);
      // maybe onAdded has function for close modal? if not, do onClose()

      // If error response, maybe show it here?
      setError("Failed to edit item. Please try again later.");

      // If added
      onAdded();
    }, 2000); // Simulating 2 seconds for folder creation
  };

  const renderCloseButton = () => {
    return (
      <View style={styles.buttonRow}>
        {/*ToDo: add close icon button here */}
        <Text onPress={onClose}>Close</Text></View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          {renderCloseButton()}
          <Text style={Styles.heading}>Edit item</Text>
          {isLoading ? (
            <>
              <ActivityIndicator size="large" color={Colors.primary} />
            </>
          ) : (
            <>
              {error ? (
                <Text style={{ color: Colors.error }}>{error}</Text>
              ) : (
                <ItemForm onSubmit={handleEditItem}/> {/*ToDo: Add initial data*/}
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "95%",
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 32,
    width: "100%",
  },
});

export default EditItemModal;
