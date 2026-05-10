import axios from "axios";
import { config } from "../config/config";
import { fetchCsrfToken } from "./csrfToken";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: config.WITH_CREDENTIALS,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------
// Request interceptor (CSRF)
axiosInstance.interceptors.request.use(
  async (configReq) => {
    if (["post", "put", "patch", "delete"].includes(configReq.method)) {
      const token = await fetchCsrfToken();
      if (token) configReq.headers["X-CSRF-Token"] = token;
    }
    return configReq;
  },
  (error) => Promise.reject(error)
);

// -------------------------
// Response interceptor (Refresh Token)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/auth/refresh-token");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);

        window.location.href = "/"; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);