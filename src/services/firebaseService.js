import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
  runTransaction,
  doc,
  deleteDoc,
  getDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

const fetchData = async (q) => {
  try {
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // ToDo: comment
    console.log("Fetched data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

/*----------------------- GETS -----------------------*/
export const getRootFolderContent = async (uid) => {
  const q = query(
    collection(db, "folder-data"),
    where("createdBy", "==", uid),
    where("name", "==", "root")
  );
  return await fetchData(q);
};

export const getFolderContent = async (documentId) => {
  const q = query(
    collection(db, "folder-data"),
    where("__name__", "==", documentId)
  );
  return await fetchData(q);
};

export const getItemsToBuy = async (uid) => {
  const statuses = ["toBuy", "completed"];
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("shoppingListStatus", "in", statuses)
  );
  return await fetchData(q);
};

export const getFavorites = async (uid) => {
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("favoriteList", "==", true)
  );
  return await fetchData(q);
};

export const getAllFolders = async (uid) => {
  // Step 1: Retrieve all folders
  const folderQuery = query(
    collection(db, "folder-data"),
    where("createdBy", "==", uid)
  );
  const folders = await fetchData(folderQuery);

  return folders;
};

/*----------------------- DELETES -----------------------*/

export const deleteItem = async (collectionPath, documentId) => {
  // Check if the document exists
  const itemDoc = doc(db, collectionPath, documentId);
  const itemSnapshot = await getDoc(itemDoc);

  if (itemSnapshot.exists()) {
    await deleteDoc(itemDoc);
    console.log("Document deleted successfully with id: ", documentId);
  } else {
    console.log("Document does not exist with id: ", documentId);
  }
};

/*----------------------- POSTS -----------------------*/

export const createFolder = async (folderName, parentId, uid) => {
  try {
    let folderRef = "";
    await runTransaction(db, async (transaction) => {
      // Step 1: Create the folder document at the first level
      folderRef = doc(db, "folder-data"); // Use a collection reference to generate an auto ID
      const folderData = {
        name: folderName,
        createdBy: uid,
        parentId, // Assuming you pass the parent folder ID as an argument
        subfolders: [], // Initialize subfolders array
        items: [],
        timestamp: serverTimestamp(),
      };
      transaction.set(folderRef, folderData);

      // Step 2: Create a reference to the folder in the parent folder's document
      const parentFolderRef = doc(db, "folder-data", parentId);
      const subfolderData = {
        name: folderName,
        folderId: folderRef.id, // Use the auto-generated ID of the newly created folder
        timestamp: folderRef.timestamp,
      };
      transaction.set(
        doc(parentFolderRef.collection("subfolders")),
        subfolderData
      );
    });
    console.log("Transaction successfully committed!");
    return folderRef.id;
  } catch (error) {
    console.error("Transaction failed: ", error);
  }
};
