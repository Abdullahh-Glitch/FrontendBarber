import { axiosInstance } from "./axiosInstance";

export const isAuth = async ({username, password}) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      username,
      password
    });
    return response.data;
    
  } catch (err) {
        return { success: false, message: err.message };
  }
};