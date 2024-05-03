import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import React, { useState, useMemo } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import FolderListItem from "./FolderListItem";
import ObjectListItem from "./ObjectListItem";

const FolderContent = ({ folderId }) => {
  const navigation = useNavigation();
  const [sortByName, setSortByName] = useState(false);
  const [mockData, setMockData] = useState({
    id: folderId,
    name: "Folder 1",
    objects: [
      { id: "1", name: "Object a", amount: 1 },
      { id: "2", name: "Object c", amount: 2 },
      { id: "3", name: "Object b", amount: 3 },
    ],
    subfolders: [
      { id: "subfolder1", name: "Subfolder 2" },
      { id: "subfolder2", name: "Subfolder 1" },
    ],
  });

  // TODO: Move? Maybe we should let the parent handle the data, and let this component handle the rendering.
  const sortedContent = useMemo(() => {
    // Add type field for easier distinction
    const sortedObjects = mockData.objects.map((item) => ({
      ...item,
      type: "object",
    }));
    const sortedSubfolders = mockData.subfolders.map((item) => ({
      ...item,
      type: "subfolder",
    }));

    const sortByNameFunction = (a, b) => a.name.localeCompare(b.name);

    if (sortByName) {
      sortedObjects.sort(sortByNameFunction);
      sortedSubfolders.sort(sortByNameFunction);
    }

    return sortedSubfolders.concat(sortedObjects); // Shows folders on top, should we mix them?
  }, [mockData, sortByName]);

  const handleNextFolder = (folderId) => {
    const title = mockData.subfolders.find((item) => item.id === folderId).name;

    navigation.push("Item Folder", {
      title,
      folderId,
      key: folderId,
      previousScreenTitle: mockData.name,
    });
  };

  const renderItem = ({ item }) => {
    if (item.type === "object") {
      return <ObjectListItem item={item} />; //TODO: add the other fields
    } else {
      return (
        <FolderListItem
          folderId={item.id}
          folderName={item.name}
          onPress={handleNextFolder}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/*TODO: Move the checkbox to a filter dropdown/modal in the parent */}
      <CheckBox
        checked={sortByName}
        onPress={() => setSortByName(!sortByName)}
        title="Sort by name"
        containerStyle={{
          backgroundColor: "rgba(0,0,0,0)",
        }}
      />
      <FlatList
        data={sortedContent}
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
