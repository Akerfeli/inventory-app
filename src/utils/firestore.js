import { getDocs, collectionGroup, query, where } from "firebase/firestore";

import { db } from "../../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

export const useCollections = async () => {
  const { userState } = useAuth();
  try {
    const q = query(
      collectionGroup(db, "items"),
      where("createdBy", "==", userState.id)
    );

    const querySnapshot = await getDocs(q);

    const collections = [];
    querySnapshot.forEach((doc) => {
      collections.push(doc.data());
    });

    console.log(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
