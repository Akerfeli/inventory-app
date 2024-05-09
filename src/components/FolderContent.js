import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import FolderListItem from "./FolderListItem";
import ObjectListItem from "./ObjectListItem";

const FolderContent = ({ folderData, folderName }) => {
  const navigation = useNavigation();

  const handleNextFolder = (folder) => {
    navigation.push("Item Folder", {
      title: folder.name,
      folderId: folder.id,
      key: folder.id,
      previousScreenTitle: folderName,
    });
  };

  const renderItem = ({ item }) => {
    if (item.type === "folder") {
      return (
        <FolderListItem
          folderId={item.id}
          folderName={item.name}
          onPress={() => handleNextFolder(item)}
        />
      );
    } else {
      // Render as an object
      return <ObjectListItem item={item} />;
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={folderData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#ddd",
  },
});

export default FolderContent;
