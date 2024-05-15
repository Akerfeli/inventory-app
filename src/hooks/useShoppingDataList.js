import { collectionGroup, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

const useShoppingDataList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userState } = useAuth();

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

  const getItemsToBuy = async (uid) => {
    const statuses = ["toBuy", "completed"];
    const q = query(
      collectionGroup(db, "items"),
      where("createdBy", "==", uid),
      where("shoppingListStatus", "in", statuses)
    );
    return await listenForChanges(q, setData);
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = getItemsToBuy(userState.id);
    setIsLoading(false);

    return () => {
      unsubscribe();
    };
  }, [userState.id]);

  return { data, isLoading };
};

export default useShoppingDataList;
