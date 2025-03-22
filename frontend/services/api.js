import axios from "axios";

const API_URL = "http://192.168.68.104:4444/";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const fetchHome = async () => {
  try {
    const response = await api.get(API_URL + "home?view=products");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
