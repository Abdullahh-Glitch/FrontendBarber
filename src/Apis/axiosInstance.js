import axios from "axios";
import { fetchCsrfToken } from "./csrfToken";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------
// Request interceptor: add CSRF token for state-changing requests
axiosInstance.interceptors.request.use(
  async (config) => {
    if (["post", "put", "patch", "delete"].includes(config.method)) {
      const token = await fetchCsrfToken();
      if (token) config.headers["CSRF-Token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------
// Response interceptor: auto-refresh access token on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Use POST as per your backend
        await axios.post(
          "http://localhost:5000/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optional: redirect to login
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
