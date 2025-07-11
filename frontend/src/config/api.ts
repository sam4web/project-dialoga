import axios from "axios";
import env from "./env";
import { API_TIMEOUT_MS } from "./constants";

export const apiEndpoints = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    refreshToken: "/api/auth/refresh",
    logout: "/api/auth/logout",
  },
};

const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
