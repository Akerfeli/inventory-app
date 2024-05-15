import { Icon } from "@rneui/themed";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { Colors } from "../globalStyles";

const FolderMenu = ({ folderName, onAddFolderPressed }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 56,
        paddingHorizontal: 16,
        paddingVertical: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 8,
        //borderBottomWidth: 1,
        //borderBottomColor: "#ddd",
      }}
    >
      <Icon
        name="folder-plus-outline"
        type="material-community"
        color={Colors.primary}
        size={40}
        onPress={onAddFolderPressed}
      />
    </View>
  );
};

export default FolderMenu;
