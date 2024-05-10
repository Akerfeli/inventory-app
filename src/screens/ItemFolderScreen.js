import { useRoute } from "@react-navigation/native";
import React, { useState, useMemo } from "react";
import { View } from "react-native";

import Breadcrumbs from "../components/Breadcrumbs";
import FolderContent from "../components/FolderContent";

const ItemFolderScreen = () => {
  const route = useRoute();
  const { previousScreenTitle, title, folderId } = route.params;

  const [mockData, setMockData] = useState({
    id: 0,
    name: "Folder 1",
    items: [
      { id: "1", name: "Object a", amount: 1 },
      { id: "2", name: "Object c", amount: 2 },
      { id: "3", name: "Object b", amount: 3 },
    ],
    subfolders: [
      { id: "subfolder1", name: "Subfolder 2" },
      { id: "subfolder2", name: "Subfolder 1" },
    ],
  });

  // Flatten the data
  const flatData = useMemo(() => {
    const flatten = (data) => {
      let flatArray = [];
      data.items.forEach((obj) => flatArray.push({ ...obj, type: "object" }));
      data.subfolders.forEach((subfolder) =>
        flatArray.push({ ...subfolder, type: "folder" })
      );
      return flatArray;
    };
    return flatten(mockData);
  }, [mockData]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        backgroundColor: "white",
      }}
    >
      <Breadcrumbs
        currentScreenTitle={title}
        previousScreenTitle={previousScreenTitle}
      />
      <FolderContent folderData={flatData} folderName={mockData.name} />
    </View>
  );
};

export default ItemFolderScreen;
