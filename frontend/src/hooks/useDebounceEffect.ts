/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const useDebounceEffect = (action: () => void, deps: React.DependencyList, delay: number) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const timeoutId = setTimeout(() => {
      action();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [...deps, delay]);
};

export default useDebounceEffect;
