import {
  getDocs,
  collection,
  query,
  where,
  collectionGroup,
  doc,
  deleteDoc,
  getDoc,
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
  const q = query(
    collectionGroup(db, "items"),
    where("createdBy", "==", uid),
    where("shoppingList", "==", true)
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
