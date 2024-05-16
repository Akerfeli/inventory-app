import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
  runTransaction,
  doc,
  writeBatch,
  deleteDoc,
  deleteCollection,
  addDoc,
  getDoc,
  setDoc,
  serverTimestamp,
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

export const getRootContentAndFolderContent = async (uid, setData) => {
  console.log(uid);
  const rootContent = await getRootContent(uid, setData);
  console.log("RootConent:", rootContent);

  const folderContent = await getFolderContentById(rootContent.id, setData);
  console.log("FodlerCotent:", folderContent);

  const result = {
    ...rootContent,
    items: folderContent.items,
    subfolders: folderContent.subfolders,
  };

  setData(result);
};

export const getRootContent = async (uid, setData) => {
  const q = query(
    collection(db, "folder-data"),
    where("createdBy", "==", uid),
    where("name", "==", "root")
  );

  const rootRef = await listenForChanges(q, setData);

  if (rootRef.length === 0) {
    throw new Error("Root folder not found");
  }

  return rootRef[0]; //Will always only exist one item in the array
};

export const getFolderContentById = async (folderId, setData) => {
  console.log("Fetching folder " + folderId);
  const itemsQ = query(collection(db, `folder-data/${folderId}/items`));
  const subfoldersQ = query(
    collection(db, `folder-data/${folderId}/subfolders`)
  );

  const [itemsSnapshot, subfoldersSnapshot] = await Promise.all([
    listenForChanges(itemsQ, setData),
    listenForChanges(subfoldersQ, setData),
  ]);

  const folderContent = {
    items: itemsSnapshot,
    subfolders: subfoldersSnapshot,
  };

  return folderContent;
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
