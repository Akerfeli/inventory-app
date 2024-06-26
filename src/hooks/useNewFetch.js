import { useEffect, useState } from "react";

const useNewFetch = (firebaseFunction, params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Call firebaseFunction with params
        const unsubscribe = await firebaseFunction(...params, setData);

        setError(null);

        // Return the unsubscribe function for cleanup
        return unsubscribe;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribePromise = fetchData();

    // Cleanup function
    return () => {
      unsubscribePromise.then((unsubscribe) => {
        if (unsubscribe) {
          unsubscribe(); // Unsubscribe if it's available
        }
      });
    };
  }, []);

  return { data, isLoading, error };
};

export default useNewFetch;
