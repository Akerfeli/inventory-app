import {
  collection,
  query,
  where,
  collectionGroup,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

const listenForChanges = async (query, setData) => {
  const unsubscribe = onSnapshot(query, (snapshot) => {
    const newData = [];
    snapshot.forEach((doc) => {
      newData.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setData(newData);
  });

  return unsubscribe;
};

/*----------------------- GETS -----------------------*/

export const getSubFolders = async (documentId, setData) => {
  const q = query(collection(db, `folder-data/${documentId}/subfolders`));

  return await listenForChanges(q, setData);
};

export const getItems = async (documentId, setData) => {
  const q = query(collection(db, `folder-data/${documentId}/items`));
  return await listenForChanges(q, setData);
};

export const getFolderContentByDocId = async (documentId, setData) => {
  const q = query(
    collection(db, "folder-data"),
    where("__name__", "==", documentId)
  );
  return await listenForChanges(q, setData);
};

export const getItemsToBuy = async (uid, setData) => {
  const statuses = ["toBuy", "completed"];
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("shoppingListStatus", "in", statuses)
  );
  return await listenForChanges(q, setData);
};

export const getFavorites = async (uid, setData) => {
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("favoriteList", "==", true)
  );
  return await listenForChanges(q, setData);
};

export const getAllFolders = async (uid, setData) => {
  const q = query(collection(db, "folder-data"), where("createdBy", "==", uid));

  return await listenForChanges(q, setData);
};

export const getItemsByCategory = async (uid, category, setData) => {
  const q = query(
    collectionGroup(db, "items"),
    where("category", "==", category),
    where("createdBy", "==", uid)
  );
  return await listenForChanges(q, setData);
};

export const getCategories = async (uid, setData) => {
  // Construct the query to listen for changes on the collection group
  const q = query(collectionGroup(db, "items"), where("createdBy", "==", uid));

  // Use listenForChanges instead of getDocs
  return await listenForChanges(q, setData);
  // Return the unsubscribe function
};
