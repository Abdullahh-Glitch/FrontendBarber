import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // your backend base URL
  withCredentials: true,  // include cookies if you use sessions/JWT in cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (for adding auth tokens)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // or cookies
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// ✅ Response Interceptor (for handling errors globally)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       // You can redirect user to login page here
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
