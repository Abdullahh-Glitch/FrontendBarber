import { axiosInstance } from "./axiosInstance";

export const getStudents = async (classId, sectionId) => {
  const response = await axiosInstance.get(`/students/${classId}/${sectionId}`);
  return response.data;
};
