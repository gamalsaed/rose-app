import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string | null) {
    const [storeValue, setStoreValue] = useState<string | null>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        return window.localStorage.getItem(key) || initialValue;
    });

    const setValue = (value: string) => {
        setStoreValue(value);
        window.localStorage.setItem(key, value);
    };

    const removeValue = () => {
        setStoreValue(null);
        window.localStorage.removeItem(key);
    };

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                setStoreValue(e.newValue);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key , initialValue]);

    return [storeValue,  setValue, removeValue ] as const;
}