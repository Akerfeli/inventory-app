import { useEffect, useState, useRef } from "react";

const useFetch = (firebaseFunction, uid) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /*   const firebasefunctionRef = useRef(firebaseFunction); */
  useEffect(() => {
    console.log("In useEffect! ");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const unsubscribe = await firebaseFunction(uid, setData);

        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useFetch;

// ToDo: Cleanup
//const { data, error } = useFetch();
