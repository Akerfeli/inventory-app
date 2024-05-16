import { Icon } from "@rneui/themed";
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useAuth } from "../contexts/AuthContext";
import { Colors } from "../globalStyles";
import useFetch from "../hooks/useFetch";
import { getAllFolders } from "../services/firebaseService";

/*
const folders = [
  { id: "1", name: "Root", parentId: null },
  { id: "2", name: "Subfolder 1", parentId: "1" },
  { id: "3", name: "Subfolder 2", parentId: "1" },
  { id: "4", name: "Subfolder 3", parentId: "1" },
  { id: "5", name: "Subsubfolder 1", parentId: "3" },
];*/

const FolderSelection = ({
  selectedFolderId,
  onSelectFolder,
  onAddFolderPressed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userState } = useAuth();

  const {
    data: folders,
    isLoading,
    error,
  } = useFetch({
    firebaseFunction: () => getAllFolders(userState.id),
  });

  console.log("folders: ", folders);
  console.log("selectedFolder: ", selectedFolderId);

  useEffect(() => {
    // If selected folder does not exist in list, set selected to root
    if (
      !isLoading &&
      folders &&
      folders.length > 0 &&
      (!selectedFolderId ||
        !folders.find((folder) => folder.id === selectedFolderId))
    ) {
      const root = folders.find((folder) => folder.parentId === null);
      onSelectFolder(root.id);
    }
  }, [folders, selectedFolderId, isLoading]);

  const currentOpenFolder = useMemo(() => {
    if (!isLoading && folders && selectedFolderId) {
      return folders.find((folder) => folder.id === selectedFolderId) || {};
    }
  }, [folders, selectedFolderId, isLoading]);

  const currentSubfolders = useMemo(() => {
    if (!isLoading && folders && selectedFolderId) {
      return folders.filter((folder) => folder.parentId === selectedFolderId);
    }
  }, [folders, selectedFolderId, isLoading]);

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
            <Text>{currentOpenFolder?.name}</Text>
          </View>
          <Icon
            name="keyboard-arrow-up"
            type="material-icons"
            color={Colors.primary}
            size={20}
          />
        </TouchableOpacity>
        {currentOpenFolder.parentId
          ? renderBackRow() /*Show go back option when non-root folder*/
          : null}
        {renderAddFolderRow()}
        <View
          style={[
            styles.listContainer,
            currentSubfolders?.length === 0 && { borderColor: "transparent" },
          ]}
        >
          <FlatList
            nestedScrollEnabled={true}
            data={currentSubfolders}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleFolderSelect(item.id)}>
                <View style={styles.listItem}>
                  <Text>{item?.name}</Text>
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
          <Text>{currentOpenFolder?.name}</Text>
        </View>
        <Icon
          name="keyboard-arrow-down"
          type="material-icons"
          color="#aaa"
          size={20}
        />
      </TouchableOpacity>
    );
  };

  if (isLoading || !folders || !selectedFolderId) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color={Colors.primary}
      />
    );
  }

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      {isOpen ? renderOpen() : renderClosed()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "white",
    width: "100%",
    overflow: "hidden",
    minheight: 40,
  },
  containerOpen: {
    borderColor: Colors.secondary,
    height: "auto",
  },
  selected: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOpen: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.tertiary,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  goBackRow: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addRow: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  listContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    maxHeight: 500,
  },
  listItem: {
    padding: 8,
  },
});

export default FolderSelection;
