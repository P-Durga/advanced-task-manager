import { useState, useCallback, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const [error, setError] = useState(null);

  const setValue = useCallback((value) => {
    try {
      setError(null);
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      setError(error.message);
      
      // Check if quota exceeded
      if (error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded. Consider clearing old data.');
      }
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) setStoredValue(JSON.parse(item));
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error);
        setError(error.message);
      }
    };

    window.addEventListener('local-storage', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('local-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, error];
};