import { axiosInstance } from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/api/products/p");
  return response.data;
};

export const getProductCategories = async () => {
  const response = await axiosInstance.get("/api/products/c");
  return response.data;
};

export const postProducts = async (product)=>{
  const response = await axiosInstance.post("/api/products/p",product);
  return response.data;
}

export const updateProducts = async(productId,product)=>{
  const response = await axiosInstance.put(`/api/products/p/${productId}`,product);
  return response.data;
}

export const postProductCategory = async(name)=>{
  const response = await axiosInstance.post('/api/products/c',name);
  return response.data;
}