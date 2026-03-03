import { axiosInstance } from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/api/products/p");
  return response.data;
};

export const getProductCategories = async () => {
  const response = await axiosInstance.get("/api/products/c");
  return response.data;
};

export const getProductForSearch = async (name) => {
  const response = await axiosInstance.get(`/api/products/p/s/${name}`);
  return response.data;
}

export const postProducts = async (data)=>{
  const {product,stock,productId} = data;

  const response = await axiosInstance.post("/api/products/p", {product : product, stock : stock, productId : productId});
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

export const deleteProduct = async(prdId)=>{
  console.log(prdId);
  
  const response = await axiosInstance.put(`/api/products/p/d/${prdId}`);
  return response.massage;
}