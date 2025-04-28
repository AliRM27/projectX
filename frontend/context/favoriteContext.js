import React, { createContext, useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { fetchFavorites } from "../services/api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await fetchFavorites();
      setFavorites(response.items.map((item) => item.product._id));
    } catch (error) {
      Alert.alert("Error", "Failed to load favorites");
    }
  };
  //I STOPPED HERE
  const toggleFavorite = async (shopId) => {
    try {
      if (favorites.includes(shopId)) {
        await axios.delete(`/favorites/${shopId}`);
        setFavorites((prev) => prev.filter((id) => id !== shopId));
      } else {
        await axios.post(`/favorites/${shopId}`);
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
