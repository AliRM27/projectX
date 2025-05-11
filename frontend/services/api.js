import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "../utils/refreshToken.js";
import { router } from "expo-router";
import { sampleData } from "../utils/samlpeDatas.js";
import { API_URL } from "./config.js";

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
    // Simulate a delay
    const queries = queryKey.slice(1).join(",");
    const response = await api.get(`home?view=${queries}`);
    return response.data;
  } catch (error) {
    console.error(error, "Server error");
  }
};

export const fetchProducts = async ({ queryKey }) => {
  try {
    const id = queryKey[1];
    const response = await api.get("products?shopId=" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProduct = async (id) => {
  try {
    const response = await api.get("products/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchShops = async ({
  searchQuery = "",
  value = "false",
  value2 = "",
  query = "",
}) => {
  try {
    const queries = query && query.slice().join(",");
    const response = await api.get(
      `shops?name=${searchQuery.trim()}&showSold=${value}&rating=${value2}&queries=${queries}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchShop = async ({ queryKey }) => {
  try {
    const response = await api.get("shops/" + queryKey[1]);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get("user");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCart = async () => {
  try {
    const response = await api.get("cart");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("cart/add", {
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
    const response = await api.delete("cart/remove", {
      data: { productId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchFavorites = async () => {
  try {
    const response = await api.get("wishlist");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addToFavorites = async (shopId) => {
  try {
    const response = await api.post("wishlist", { shopId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeFromFavorites = async (shopId) => {
  try {
    const response = await api.delete("wishlist", {
      data: { shopId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategories = async () => {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(sampleData.categories);
  //   }, 4000);
  // });
  try {
    const response = await api.get("categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
