import config from "@/config";
import axios from "axios";
import { API_TIMEOUT_MS, HTTP_STATUS } from "@shared/constants";
import { store } from "@/app/store";
import { setTooManyRequests } from "@/app/slices/errorSlice";

const api = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (respones) => respones,
  (error) => {
    if (error.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
      store.dispatch(setTooManyRequests(true));
      return Promise.reject(new Error("Too many requests. Please try again in a few minutes."));
    }
    return Promise.reject(error);
  }
);

export default api;
