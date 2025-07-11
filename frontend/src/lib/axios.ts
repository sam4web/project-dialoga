import { API_TIMEOUT_MS } from "@/config/constants";
import env from "@/config/env";
import axios from "axios";

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
