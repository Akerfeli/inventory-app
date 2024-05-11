import { Input } from "@rneui/themed";
import React, { useState } from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text,
  Modal,
} from "react-native";

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
      <View style={{ flexDirection: "row", gap: 32, justifyContent: "center" }}>
        <TouchableOpacity onPress={onClose}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        {!error && (
          <TouchableOpacity onPress={handleAddFolder}>
            <Text>Add Folder</Text>
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            padding: 16,
            width: "80%",
            minHeight: 168,
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <Text>Add folder</Text>
          {isLoading ? (
            <>
              <ActivityIndicator size="large" />
              <View>{/* For displaying the layout correctly */}</View>
            </>
          ) : (
            <>
              {error ? (
                <Text style={{ color: "red" }}>{error}</Text>
              ) : (
                <Input
                  value={name}
                  onChangeText={setName}
                  placeholder="Folder name"
                  errorMessage={inputError}
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

export default FolderCreationModal;
