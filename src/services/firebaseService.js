import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

// ToDo: Refactor the code and reuse some parts
export const getRootFolderContent = async (uid) => {
  try {
    const q = query(
      collection(db, "folder-data"),
      where("createdBy", "==", uid),
      where("name", "==", "root")
    );

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("From firebaseService.js ", data);

    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

export const getAllFolders = async (uid) => {
  try {
    // Step 1: Retrieve all folders
    const folderQuery = query(
      collection(db, "folder-data"),
      where("createdBy", "==", uid)
    );
    const folderQuerySnapshot = await getDocs(folderQuery);

    const folders = [];
    folderQuerySnapshot.forEach((folderDoc) => {
      folders.push({
        id: folderDoc.id,
        ...folderDoc.data(),
      });
    });

    // Step 2: Fetch subfolders for each folder
    for (const folder of folders) {
      const subfolderQuery = query(
        collectionGroup(db, "subfolders"),
        where("folderId", "==", folder.id)
      );
      const subfolderQuerySnapshot = await getDocs(subfolderQuery);

      const subfolders = [];
      subfolderQuerySnapshot.forEach((subfolderDoc) => {
        const subfolderData = {
          id: subfolderDoc.id,
          ...subfolderDoc.data(),
        };
        subfolders.push(subfolderData);
        // Log subfolder data
        /* console.log("Subfolder Data:", subfolderData); */
      });

      folder.subfolders = subfolders;

      // Log folder with subfolders
      /*  console.log("Folder:", folder); */
    }

    return folders;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

export const getFolderContent = async (documentId) => {
  try {
    const q = query(
      collection(db, "folder-data"),
      where("__name__", "==", documentId)
    );

    const querySnapshot = await getDocs(q);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("From firebaseService.js ", data);

    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

export const getItemsToBuy = async (uid) => {
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("shoppingList", "==", true)
  );
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log("From firebaseService.js ", data);

  return data;
};

export const getFavorites = async (uid) => {
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("favoriteList", "==", true)
  );
  const querySnapshot = await getDocs(q);

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  console.log("From firebaseService.js ", data);

  return data;
};
