import { Check } from "lucide-react";
import { axiosInstance } from "./axiosInstance";

export const getService = async () => {
  const response = await axiosInstance.get("/api/services/s");
  return response.data;
};

export const getServiceForTable = async () => {
  const response = await axiosInstance.get("/api/services/s/ft");
  return response.data;
};

export const CheckName = async (name) => {
  try {
    const res = await axiosInstance.get(`/api/services/s/n/${name}`);
    return res.data; // expected { exists: false }
  } catch (err) {
    if (err.response?.status === 409) {
      // Treat 409 as “name exists”
      return { exists: true };
    }
    throw err; // other errors bubble up
  }
}

export const postService = async (data)=>{
  const {service,products} = data;
  const response = await axiosInstance.post("/api/services/s",{service,products});
  return response.data;
}

export const updateService = async(serviceId,service)=>{
  const response = await axiosInstance.put(`/api/services/s/${serviceId}`,service);
  return response.data;
}

export const deleteService = async(serviceId)=>{
  console.log(serviceId);

  const response = await axiosInstance.put(`/api/services/s/d/${serviceId}`);
  return response.data;
}

export const getServiceProductsByServiceId = async (serviceId)=>{
  const response = await axiosInstance.get(`/api/services/s/p/${serviceId}`);
  return response.data;
}

export const updateServiceandProducts = async(data)=>{
  const {serviceId, service, products} = data;
  const response = await axiosInstance.put(`/api/services/s/sp/${serviceId}`,{service: service, products: products});
  return response.data;
}