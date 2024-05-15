import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
  runTransaction,
  doc,
  batch,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

// ToDo: Research about having a callback (setData) and if there exist a cleanup function
// SSo we can put it in the useEffect to do a cleanup when unmounted.
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
    // ToDo: Comment out
    console.log("Fetched data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching response:", error);
  }
};

/*----------------------- GETS -----------------------*/
export const getRootContentAndFolderContent = async (uid) => {
  const rootContent = await getRootContent(uid);

  const folderContent = await getFolderContentById(rootContent.id);

  const result = {
    ...rootContent,
    items: folderContent.items,
    subfolders: folderContent.subfolders,
  };
  return result;
};

export const getRootContent = async (uid) => {
  const q = query(
    collection(db, "folder-data"),
    where("createdBy", "==", uid),
    where("name", "==", "root")
  );

  const rootRef = await fetchData(q);

  if (rootRef.length === 0) {
    throw new Error("Root folder not found");
  }

  return rootRef[0]; //Will always only exist one item in the array
};

export const getFolderContentById = async (folderId) => {
  console.log("Fetching folder " + folderId);
  const itemsQ = query(collection(db, `folder-data/${folderId}/items`));
  const subfoldersQ = query(
    collection(db, `folder-data/${folderId}/subfolders`)
  );

  const [itemsSnapshot, subfoldersSnapshot] = await Promise.all([
    fetchData(itemsQ),
    fetchData(subfoldersQ),
  ]);

  const folderContent = {
    items: itemsSnapshot,
    subfolders: subfoldersSnapshot,
  };

  return folderContent;
};

export const getFolderContentByDocId = async (documentId) => {
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
  const q = query(collection(db, "folder-data"), where("createdBy", "==", uid));

  return await fetchData(q);
};

export const getItemsByCategory = async (category) => {
  const q = query(
    collectionGroup(db, "items"),
    where("category", "==", category)
  );
  return await fetchData(q);
};

export const getCategories = async () => {
  const q = collectionGroup(db, "items");
  const items = await fetchData(q);

  const categories = new Set();

  items.forEach((item) => {
    if (item.category && item.category.trim() !== "") {
      // Check if category exists and is not empty
      categories.add(item.category);
    }
  });

  console.log("-------------IN SERVICE---------------");
  console.log(Array.from(categories)); // Convert Set to Array for return
  return Array.from(categories);
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
        timeCreated: serverTimestamp(),
      };
      transaction.set(folderRef, folderData);

      // Step 2: Create a reference to the folder in the parent folder's document
      const parentFolderRef = doc(db, "folder-data", parentId);
      const subfolderData = {
        name: folderName,
        folderId: folderRef.id, // Use the auto-generated ID of the newly created folder
        timestamp: folderRef.timeCreated,
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

export const createRootFolder = async (uid) => {
  try {
    const folderCollectionRef = collection(db, "folder-data"); // Reference to the collection
    const folderRef = doc(folderCollectionRef); // Reference to a new document in the collection
    const folderData = {
      name: "root",
      createdBy: uid,
      parentId: null,
      timeCreated: serverTimestamp(),
    };

    await setDoc(folderRef, folderData);
    console.log("Root folder created successfully for user:", uid);
    return folderRef.id;
  } catch (error) {
    console.error("Error creating root folder:", error);
    // Handle error appropriately, e.g., notify the user, retry, etc.
  }
};

export const createItem = async (uid, fieldInfo) => {
  try {
    const { parentId, ...otherFields } = fieldInfo;

    // Check if parentId is provided
    if (!parentId) {
      throw new Error("Parent ID is required.");
    }

    // Construct the item data
    const itemData = {
      createdBy: uid,
      parentId,
      timeCreated: serverTimestamp(),
      ...otherFields,
    };

    // Reference to the parent folder's items collection
    const itemsCollectionRef = collection(db, "folder-data", parentId, "items");

    // Add the item document to the parent folder's items collection and get its ID
    const newItemRef = await addDoc(itemsCollectionRef, itemData);
    const newItemId = newItemRef.id;

    console.log("Item created successfully!");

    return newItemId;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

/*----------------------- PUT -----------------------*/

export const editItem = async (itemId, currentParentId, updatedFields) => {
  try {
    // Execute the transaction
    await runTransaction(db, async (transaction) => {
      // Reference to the item document in the current parent folder
      const currentItemRef = doc(
        db,
        "folder-data",
        currentParentId,
        "items",
        itemId
      );

      // Add the item to the items collection in the new parentId folder
      if (updatedFields.parentId !== currentParentId) {
        const newItemRef = doc(
          db,
          "folder-data",
          updatedFields.parentId,
          "items",
          itemId
        );
        transaction.set(newItemRef, updatedFields);
        transaction.delete(currentItemRef);
      } else {
        // Update the item document with the provided updated fields
        transaction.update(currentItemRef, updatedFields);
      }
    });

    console.log("Item updated successfully!");
  } catch (error) {
    console.error("Error editing item:", error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};

export const updateShoppingListStatus = async (items) => {
  try {
    // Initialize a batched write
    const batchedWrite = batch();

    // Iterate over the items array
    items.forEach(({ itemId, parentId }) => {
      // Reference to the item document
      const itemRef = doc(db, "folder-data", parentId, "items", itemId);

      // Update the shoppingListStatus field to "notListed"
      batchedWrite.update(itemRef, { shoppingListStatus: "notListed" });
    });

    // Commit the batched write
    await batchedWrite.commit();

    console.log("Shopping list status updated successfully!");
  } catch (error) {
    console.error("Error updating shopping list status:", error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};
