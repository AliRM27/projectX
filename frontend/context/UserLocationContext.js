// context/UserLocationContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "user_location";

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {
  const [location, setLocationState] = useState(null);

  const setLocation = async (loc) => {
    setLocationState(loc);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(loc));
  };

  useEffect(() => {
    const loadStoredLocation = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setLocationState(JSON.parse(stored));
      }
    };
    loadStoredLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export const useUserLocation = () => useContext(UserLocationContext);
