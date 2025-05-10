import { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import {
  fetchFavorites,
  removeFromFavorites,
  addToFavorites,
} from "../services/api";
import { useUser } from "./userContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser(); // Access logged-in user

  // Load favorites when user logs in
  useEffect(() => {
    const load = async () => {
      if (user && user._id) {
        console.log("User logged in, loading favorites...");
        await loadFavorites();
      } else {
        console.log("No user, clearing favorites.");
        setFavorites([]); // Clear on logout
      }
    };

    load();
  }, [user]); // Runs whenever user changes

  const loadFavorites = async () => {
    try {
      const response = await fetchFavorites();
      setFavorites(response.items.map((item) => item.shop._id.toString()));
    } catch (error) {
      Alert.alert("Error", "Failed to load favorites");
    }
  };

  const toggleFavorite = async (shopId) => {
    try {
      if (favorites.includes(shopId)) {
        await removeFromFavorites(shopId);
        setFavorites((prev) => prev.filter((id) => id !== shopId));
      } else {
        await addToFavorites(shopId);
        setFavorites((prev) => [...prev, shopId]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update favorites");
    }
  };

  const isFavorite = (shopId) => favorites.includes(shopId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
