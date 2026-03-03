import { useEffect, useState } from 'react';

export const useDebounce = <T>(Value: T, delay: 500) => {
  // state
  const [debouncedValue, setDebouncedValue] = useState<T>(Value);
  // used for delyaing the effects
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(Value);
    }, delay);
    return () => clearTimeout(timeOut);
  }, [Value, delay]);
  return debouncedValue;
};
