import { Icon } from "@rneui/themed";
import React, { useState, useMemo } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../globalStyles";

const folders = [
  { id: "1", name: "Root", parentId: null },
  { id: "2", name: "Subfolder 1", parentId: "1" },
  { id: "3", name: "Subfolder 2", parentId: "1" },
  { id: "4", name: "Subfolder 3", parentId: "1" },
  { id: "5", name: "Subsubfolder 1", parentId: "3" },
];

const FolderSelection = ({
  selectedFolderId,
  onSelectFolder,
  onAddFolderPressed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentOpenFolder = useMemo(() => {
    return folders.find((folder) => folder.id === selectedFolderId) || {};
  }, [folders, selectedFolderId]);

  const currentSubfolders = useMemo(() => {
    return folders.filter((folder) => folder.parentId === selectedFolderId);
  }, [folders, selectedFolderId]);

  const handleFolderSelect = (folderId) => {
    onSelectFolder(folderId);
    //setIsOpen(false);
  };

  const toggleVisibility = () => {
    setIsOpen(!isOpen);
  };

  const renderBackRow = () => {
    return (
      <TouchableOpacity
        onPress={() => onSelectFolder(currentOpenFolder.parentId)}
      >
        <View style={styles.goBackRow}>
          <Icon
            name="keyboard-arrow-left"
            type="material-icons"
            color="#000"
            size={16}
          />
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddFolderRow = () => {
    return (
      <TouchableOpacity onPress={onAddFolderPressed}>
        <View style={styles.addRow}>
          <Text>+ Add Folder</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOpen = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.selectedOpen}
          onPress={toggleVisibility}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon
              name="folder-outline"
              type="material-community"
              color={Colors.secondary}
              size={24}
            />
            <Text>{currentOpenFolder.name}</Text>
          </View>
          <Icon
            name="keyboard-arrow-up"
            type="material-icons"
            color={"#aaa"}
            size={16}
          />
        </TouchableOpacity>
        {currentOpenFolder.parentId
          ? renderBackRow() /*Show go back option when non-root folder*/
          : null}
        {renderAddFolderRow()}
        <View style={styles.listContainer}>
          <FlatList
            data={currentSubfolders}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFolderSelect(item.id)}>
                <View style={styles.listItem}>
                  <Text>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </>
    );
  };

  const renderClosed = () => {
    return (
      <TouchableOpacity style={styles.selected} onPress={toggleVisibility}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon
            name="folder-outline"
            type="material-community"
            color={Colors.secondary}
            size={24}
          />
          <Text>{currentOpenFolder.name}</Text>
        </View>
        <Icon
          name="keyboard-arrow-down"
          type="material-icons"
          color={"#aaa"}
          size={16}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isOpen ? renderOpen() : renderClosed()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    overflow: "hidden",
  },
  selected: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOpen: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    padding: 8,
  },
  goBackRow: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 8,
  },
  addRow: {
    backgroundColor: "white",
    padding: 8,
  },
  listContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  listItem: {
    padding: 8,
  },
});

export default FolderSelection;
