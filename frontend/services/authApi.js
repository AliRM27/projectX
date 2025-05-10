import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api.js";
import { router } from "expo-router";

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await api.post("auth/register", userData);

    await AsyncStorage.setItem("hasLaunched", "true");
    return response.data;
  } catch (error) {
    console.log(error || "Registration failed");
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login API
export const loginUser = async (userData, setUser) => {
  try {
    const response = await api.post("auth/login", userData);
    const { accessToken, refreshToken } = response.data;

    if (accessToken && refreshToken) {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
    }

    setUser({ id: response.data.user.id, name: response.data.user.fullName });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Logout API (optional)
export const logoutUser = async (setUser) => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setUser(null);
    router.replace("login");
  } catch (error) {
    console.error(error);
  }
};
