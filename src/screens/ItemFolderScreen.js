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
      { id: "1", name: "Object a", amount: 1, description: " Description 1" },
      {
        id: "2",
        name: "Object c",
        amount: 2,
        description: " Description 2 is a very long description for testing. ",
      },
      { id: "3", name: "Object b", amount: 3, description: "" },
    ],
    subfolders: [
      { id: "subfolder1", name: "Subfolder 2" },
      { id: "subfolder2", name: "Subfolder 1" },
    ],
  });

  // Flatten the data
  const flatData = useMemo(() => {
    const flatArray = mockData.subfolders
      .map((subfolder) => ({ ...subfolder, type: "folder" }))
      .concat(mockData.items.flatMap((obj) => ({ ...obj, type: "object" })));
    return flatArray;
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
