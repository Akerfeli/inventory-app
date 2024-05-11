import { Icon } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const FolderSelection = ({
  selectedFolder,
  setSelectedFolder,
  folderStructure,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(folderId)}>
      <View
        style={{
          height: 56,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Icon
          name="folder-outline"
          type="material-community"
          color="grey"
          size={32}
        />
        <Text style={{ fontWeight: "bold" }}>{folderName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FolderSelection;
