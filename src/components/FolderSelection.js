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

const mockFolders = [
  { id: "1", name: "Root", parentId: null },
  { id: "2", name: "Subfolder 1", parentId: 1 },
  { id: "3", name: "Subfolder 2", parentId: "1" },
  { id: "4", name: "Subfolder 3", parentId: "1" },
  { id: "5", name: "Subsubfolder 1", parentId: "3" },
];

const FolderSelection = ({
  selectedFolderId,
  setSelectedFolderId,
  folders = mockFolders,
  isOpen,
  addFolderPressed,
}) => {
  const currentFolder = useMemo(() => {
    return folders.find((folder) => folder.id === selectedFolderId) || {};
  }, [folders, selectedFolderId]);

  const currentSubfolders = useMemo(() => {
    return folders.filter((folder) => folder.parentId === selectedFolderId);
  }, [folders, selectedFolderId]);

  const onFolderSelected = (folderId) => {
    setSelectedFolderId(folderId);
  };

  const renderBackRow = () => {
    return (
      <TouchableOpacity
        onPress={() => onFolderSelected(currentFolder.parentId)}
      >
        <View style={{ flexDirection: "row" }}>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAddFolderRow = () => {
    return (
      <TouchableOpacity onPress={addFolderPressed}>
        <View>
          <Text>+ Add Folder</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOpen = () => {
    return (
      <>
        {currentFolder.parentId
          ? renderBackRow() /*Show go back option when non-root folder*/
          : null}
        <View>
          <Text>{currentFolder.name}</Text>
        </View>
        {renderAddFolderRow()}
        <FlatList
          data={currentSubfolders}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onFolderSelected(item.id)}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </>
    );
  };

  const renderClosed = () => {
    return <Text>{currentFolder.name}</Text>;
  };

  return <View>{isOpen ? renderOpen() : renderClosed()}</View>;
};

export default FolderSelection;
