import { useEffect, useState, useRef } from "react";

const useFetch = ({ firebaseFunction }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const firebasefunctionRef = useRef(firebaseFunction);
  useEffect(() => {
    console.log("In useEffect! ");
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedData = await firebasefunctionRef.current();
        setData(fetchedData);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [firebasefunctionRef.current]);

  return { data, loading, error };
};

export default useFetch;

// ToDo: Cleanup
//const { data, error } = useFetch();
