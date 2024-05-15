/* import { useEffect, useState, useCallback } from "react";

const useFetch = (firebaseFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setDataCallback = useCallback((fetchedData) => {
    setData(fetchedData);
  }, []);

  useEffect(() => {
    console.log("In useEffect! ");
    const fetchData = async () => {
      try {
        const unsubscribe = await firebaseFunction(setDataCallback);
        setError(null);
        setLoading(false);
        return () => unsubscribe();
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error, setData };
};

export default useFetch;
 */

import { useState, useEffect, useCallback } from "react";

const useFetch = (subscribeToFirestore) => {
  const [data, setData] = useState(null);

  const fetchData = useCallback(
    (userId) => {
      return subscribeToFirestore(userId, (data) =>
        console.log("------------>", data)
      );
    },
    [subscribeToFirestore]
  );

  const fetchData2 = useCallback(() => {
    return subscribeToFirestore((data) => console.log("------------>", data));
  }, []);

  useEffect(() => {
    const unsubscribe = fetchData2();

    return () => {
      unsubscribe();
    };
  }, []);

  return data;
};

export default useFetch;
