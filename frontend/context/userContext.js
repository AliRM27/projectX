import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api"; // adjust path

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check AsyncStorage on mount
  useEffect(() => {
    const restoreUser = async () => {
      try {
        // Optional: set token in headers
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Fetch user data from API
          const response = await api.get("/user"); // adjust route
          setUser(response.data); // make sure response shape matches
        }
      } catch (error) {
        console.log("Failed to restore user:", error.message);
      }
    };

    restoreUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
