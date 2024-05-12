import { Input } from "@rneui/themed";
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

const FolderCreationModal = ({
  parentFolder,
  modalVisible,
  onClose,
  onAdded,
}) => {
  const [inputError, setInputError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (modalVisible) {
      // Reset modal state when it becomes visible
      setInputError("");
      setError("");
      setIsLoading(false);
      setName("");
    }
  }, [modalVisible]);

  const handleAddFolder = () => {
    // Reset any previous error
    setInputError("");
    if (!name.trim()) {
      setInputError("Please enter a folder name");
      return;
    }

    // ToDo: add folder to db here
    // Set loading state
    setIsLoading(true);

    // Simulate async folder creation in db
    setTimeout(() => {
      // If all ok
      // onAdded(newFolderId);
      // maybe onAdded has function for close modal? if not, do onClose()

      // If error response
      setError("Failed to create folder. Please try again later.");

      // Finally, reset loading state
      setIsLoading(false);
    }, 2000); // Simulating 2 seconds for folder creation
  };

  const renderButtonRow = () => {
    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onClose}>
          <Text style={Styles.textLink}>Cancel</Text>
        </TouchableOpacity>
        {!error && (
          <TouchableOpacity onPress={handleAddFolder}>
            <Text style={Styles.textLink}>Add Folder</Text>
          </TouchableOpacity>
        )}
      </View>
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
          <Text style={Styles.heading}>Add folder</Text>
          {isLoading ? (
            <>
              <ActivityIndicator size="large" color={Colors.primary} />
              <View>{/* For displaying the layout correctly */}</View>
            </>
          ) : (
            <>
              {error ? (
                <Text style={{ color: Colors.error }}>{error}</Text>
              ) : (
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Folder name"
                  errorMessage={inputError}
                  errorStyle={{ color: Colors.error }}
                  inputStyle={{ fontSize: 14 }}
                />
              )}
              {renderButtonRow()}
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
    width: "80%",
    minHeight: 168,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 32,
    justifyContent: "space-around",
  },
});

export default FolderCreationModal;
