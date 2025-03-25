import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.178.46:4444/"; // Replace with your backend URL

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Register API
export const registerUser = async (userData) => {
  try {
    const response = await authApi.post(
      API_BASE_URL + "auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    console.log(error || "Registration failed");
    throw error.response?.data?.message || "Registration failed";
  }
};

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await authApi.post("auth/login", userData);
    const token = response.data.accessToken;
    await AsyncStorage.setItem("userToken", token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// Logout API (optional)
export const logoutUser = async () => {
  try {
    const response = await authApi.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};
