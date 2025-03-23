import axios from "axios";

const API_URL = "http://192.168.178.46:4444/";

const api = axios.create({
  baseURL: API_URL,
  timeout: 2000,
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

export const fetchProduct = async (id) => {
  try {
    const response = await api.get(API_URL + "products/" + id);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
