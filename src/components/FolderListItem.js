import { Icon } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { Colors } from "../globalStyles";

const FolderListItem = ({ folderId, folderName, onPress }) => {
  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={() => onPress(folderId)}
    >
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
          color={Colors.secondary}
          size={32}
        />
        <Text style={{ fontWeight: "bold" }}>{folderName}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FolderListItem;
