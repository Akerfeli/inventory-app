import { getDocs, collection, query, where } from "firebase/firestore";

import { db } from "../../firebaseConfig";

export const getRootFolderConent = async () => {};

export const getAllFolders = async (creatorId) => {
  try {
    const q = query(
      collection(db, "folder-data"),
      where("createdBy", "==", creatorId)
    );

    const querySnapshot = await getDocs(q);

    const folderData = [];
    querySnapshot.forEach((doc) => {
      folderData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log("From firebaseService.js ", folderData);

    return folderData;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

export const getFolderContent = () => {};

export const getItemsToBuy = () => {};

export const getFavorites = () => {};
