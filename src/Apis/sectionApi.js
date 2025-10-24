import { axiosInstance } from "./axiosInstance";

export const getSections = async (classId) => {
  const response = await axiosInstance.get(`/sections/${classId}`);
  return response.data;
};
