import { axiosInstance } from "./axiosInstance";

export const getTeachers = async () => {
  const response = await axiosInstance.get("/teachers");
  return response.data;
};
