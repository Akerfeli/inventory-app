import { useEffect, useState, useMemo } from "react";

const useFetch = ({ firebaseFunction }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Did not help
  const memoizedFunction = useMemo(() => firebaseFunction, [firebaseFunction]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await memoizedFunction();
        setData(fetchedData);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memoizedFunction]);

  return { data, loading, error };
};

export default useFetch;
