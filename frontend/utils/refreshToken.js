import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://192.168.178.46:4444/";

export const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post(`${API_BASE_URL}auth/refresh-token`, {
      refreshToken,
    });

    const { accessToken } = response.data;

    await AsyncStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh token");
  }
};
