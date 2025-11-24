import { axiosInstance } from "./axiosInstance";

export const getInfo = async()=>{
  const info = await axiosInstance.get(`/auth/login/info`);
      return info.data;
}

export const isAuth = async (user, pass) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, {
      username: user,
      password: pass
    });
    return response.data;
  } catch (err) {
        return { success: false, message: err.message };
  }
};