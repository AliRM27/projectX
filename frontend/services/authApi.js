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

    await AsyncStorage.setItem("hasLaunched", "true"); //should be removed
    setUser(response.data.user);

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

export const updateUser = async (updatedData) => {
  try {
    const response = api.put("user", updatedData);
    return (await response).status;
  } catch (error) {
    console.error(error);
  }
};

export const requestReset = async (email) => {
  try {
    const response = await api.post("auth/request-reset", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Request reset failed";
  }
}

export const verifyOTP = async ({email, otp}) => {
  try {
    console.log("Verifying OTP for email:", email, "with OTP:", otp);
    const response = await api.post("auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Verify OTP failed";
  }
};
export const resetUserPassword = async ({email, newPassword}) => {
  try {
    const response = await api.post("auth/reset-password", { email, newPassword });
    return response;
  } catch (error) {
    console.error(error);
    throw error.response?.data?.message || "Reset password failed";
  }
};