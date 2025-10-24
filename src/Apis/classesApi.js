import { axiosInstance } from "./axiosInstance";

export const getClasses = async (teacherId) => {
  const response = await axiosInstance.get(`/classes/${teacherId}`);
  return response.data;
};
