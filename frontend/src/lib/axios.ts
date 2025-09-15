import config from "@/config/env";
import axios from "axios";
import { API_TIMEOUT_MS } from "@shared/constants";

const api = axios.create({
  baseURL: config.VITE_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
