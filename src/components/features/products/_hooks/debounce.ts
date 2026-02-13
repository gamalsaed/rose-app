import { useEffect, useState } from "react";

export const useDebounce = <T>(Value : T , delay : 500) =>{
const [debouncedValue, setDebouncedValue] = useState<T>(Value);

useEffect(() =>{
    const timeOut = setTimeout(() =>{
        setDebouncedValue(Value)}
,delay)
return () => clearTimeout(timeOut);
},[Value, delay])
return debouncedValue;
}