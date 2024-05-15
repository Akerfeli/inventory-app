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
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

import { useState, useEffect, useCallback } from "react";
import { getRootContent } from "../services/firebaseService";
import { useAuth } from "../contexts/AuthContext";

const useTest = () => {
  const [data, setData] = useState(null);
  const { userState } = useAuth();

  const listenForChanges = async (query, setData) => {
    console.log("In listenForChanges");
    console.log("Defining DATA!", typeof setData);
    return onSnapshot(query, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // Update data in real-time
      setData(data);
    });
  };

  const getRootContent = async (uid, setData) => {
    console.log("Defining DATA!", typeof setData);
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

  useEffect(() => {
    const unsubscribe = getRootContent(userState.id, setData);

    return () => {
      unsubscribe();
    };
  }, []);

  return { data };
};

export default useTest;
