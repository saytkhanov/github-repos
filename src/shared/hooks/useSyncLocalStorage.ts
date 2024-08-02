import { useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useSyncLocalStorage<T>(
  key: string,
  state: T,
  setState: (value: T) => void,
) {
  const [storedValue, setStoredValue] = useLocalStorage<T>(key, state);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (storedValue !== state) {
        setState(storedValue);
      }
      return;
    }

    if (state !== storedValue) {
      setStoredValue(state);
    }
  }, [state, storedValue, setState, setStoredValue]);
}
