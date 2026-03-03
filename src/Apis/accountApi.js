import { axiosInstance } from "./axiosInstance";

export const getAccounts = async () => {
  const response = await axiosInstance.get("/api/accounts/a");
  return response.data;
}

export const getSuppliersByName = async (name)=>{
  const response = await axiosInstance.get(`api/accounts/a/s/${name}`);
  return response.data;
}

export const createAccount = async (account) => {
  const response = await axiosInstance.post("/api/accounts/a", account);
  return response.data;
}

export const updateAccount = async (data) => {
  const {accountId, account} = data;
  const response = await axiosInstance.put(`/api/accounts/a/${accountId}`, account);
  return response.data;
}

export const deleteAccount = async (data) => {
  const {accountId} = data;
  const response = await axiosInstance.delete(`/api/accounts/a/${accountId}`);
  return response.data;
}

