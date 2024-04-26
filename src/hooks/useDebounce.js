import { useEffect, useState, useRef } from "react";

// Custom hook to debounce a value with a specified delay
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
