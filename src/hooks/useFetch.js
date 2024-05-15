import { useEffect, useState, useRef } from "react";

const useFetch = ({ firebaseFunction }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const firebasefunctionRef = useRef(firebaseFunction);
  useEffect(() => {
    console.log("In useEffect! ");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetchedData = await firebasefunctionRef.current();
        setData(fetchedData);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [firebasefunctionRef.current]);

  return { data, isLoading, error };
};

export default useFetch;

// ToDo: Cleanup
//const { data, error } = useFetch();
