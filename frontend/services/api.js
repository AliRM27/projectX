import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.178.46:4444/";

const api = axios.create({
  baseURL: API_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchHome = async () => {
  try {
    const response = await api.get(API_URL + "home?view=products");
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
