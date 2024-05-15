import { useMemo } from "react";

const useFlattenFolderContent = (folderData) => {
  const flatData = useMemo(() => {
    console.log("inside flat folder content memo");
    const subfolders = folderData?.subfolders || [];
    const items = folderData?.items || [];

    if (!folderData?.hasOwnProperty("subfolders")) {
      console.log("No subfolders field found in folderData");
    }

    if (!folderData?.hasOwnProperty("items")) {
      console.log("No items field found in folderData");
    }

    const flatArray = subfolders
      .map((subfolder) => ({ ...subfolder, type: "folder" }))
      .concat(items.map((obj) => ({ ...obj, type: "object" })));

    return flatArray;
  }, [folderData]);

  return flatData;
};

export default useFlattenFolderContent;
