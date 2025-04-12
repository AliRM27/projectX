import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "../utils/refreshToken.js";
import { router } from "expo-router";

export let API_URL = "http://192.168.178.46:4444/";
API_URL = "http://192.168.68.103:4444/";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        const newAccessToken = await refreshAccessToken();
        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // Retry the failed request
      } catch (err) {
        console.log("Refresh token expired, logging out...");
        // Optionally, you can log the user out here
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        router.replace("/(auth)/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const fetchHome = async ({ queryKey }) => {
  try {
    const response = await api.get(API_URL + "home?view=" + queryKey[0]);
    return response.data;
  } catch (error) {
    console.error(error, "Server error");
  }
};

export const fetchProducts = async (id) => {
  try {
    const response = await api.get(API_URL + "products?shopId=" + id);
    // console.table(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await api.get(API_URL + "products/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get(API_URL + "user");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCart = async () => {
  try {
    const response = await api.get(API_URL + "cart");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post(API_URL + "cart/add", {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(API_URL + "cart/remove", {
      data: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFavorites = async () => {
  try {
    const response = await api.get(API_URL + "wishlist");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addToFavorites = async (productId) => {
  try {
    const response = await api.post(API_URL + "wishlist", { productId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromFavorites = async (productId) => {
  try {
    const response = await api.delete(API_URL + "wishlist", {
      data: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
