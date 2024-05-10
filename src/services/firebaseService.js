import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

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

    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

export const getAllFolders = async (uid) => {
  try {
    const q = query(
      collection(db, "folder-data"),
      where("createdBy", "==", uid)
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

export const getFolderContent = () => {};

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
