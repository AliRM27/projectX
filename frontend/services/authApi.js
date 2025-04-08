import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, API_URL } from "./api.js";
import { router } from "expo-router";

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await api.post(API_URL + "auth/register", userData);
    return response.data;
  } catch (error) {
    console.log(error || "Registration failed");
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await api.post(API_URL + "auth/login", userData);
    const { accessToken, refreshToken } = response.data;

    if (accessToken && refreshToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Logout API (optional)
export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    router.replace("login");
  } catch (error) {
    console.error(error);
  }
};
