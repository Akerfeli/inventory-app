import { useNavigation } from "@react-navigation/native";
import { ListItem, Button } from "@rneui/themed";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import FolderListItem from "./FolderListItem";
import ObjectListItem from "./ObjectListItem";

const FolderContent = ({
  folderData,
  folderName,
  onDeleteFolder,
  onDeleteItem,
}) => {
  const navigation = useNavigation();

  const handleNextFolder = (folder) => {
    navigation.push("Item Folder", {
      title: folder.name,
      folderId: folder.id,
      key: folder.id,
      previousScreenTitle: folderName,
    });
  };

  const handleDelete = (itemId, itemType) => {
    if (itemType === "folder") {
      onDeleteFolder(itemId);
    } else {
      onDeleteItem(itemId);
    }
  };

  const renderSwipeableItem = ({ item }) => {
    const handlePress = () => {
      if (item.type === "folder") {
        handleNextFolder(item);
      } else {
        // ToDo: move press item to here from FolderListItem
      }
    };

    const handleDeletePress = () => {
      handleDelete(item.id, item.type);
    };

    const rightContent = (
      <Button
        title="Delete"
        onPress={handleDeletePress}
        icon={{ name: "delete", color: "white" }}
        buttonStyle={{ minHeight: "100%", backgroundColor: "#f86666" }}
      />
    );

    return (
      <ListItem.Swipeable
        rightContent={rightContent}
        containerStyle={{ padding: 0, paddingLeft: 4 }}
      >
        {item.type === "folder" ? (
          <FolderListItem
            folderId={item.id}
            folderName={item.name}
            onPress={handlePress}
          />
        ) : (
          <ObjectListItem
            item={item}
            onPress={handlePress}
            onDelete={handleDelete}
          />
        )}
      </ListItem.Swipeable>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={folderData}
        renderItem={renderSwipeableItem}
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
