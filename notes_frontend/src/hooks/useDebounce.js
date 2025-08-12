import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * useDebounce
 * Returns a debounced value after the specified delay.
 */
export function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
