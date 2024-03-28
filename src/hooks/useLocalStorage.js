import React, { useState } from "react";

export const useLocalStorage = (keyName) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      return value;
    } catch (err) {
      return null;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
