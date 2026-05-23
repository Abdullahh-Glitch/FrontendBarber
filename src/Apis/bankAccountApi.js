import { axiosInstance } from "./axiosInstance";

export const getBankAccounts = async () => {
  const response = await axiosInstance.get("/api/bank-accounts/ba");
  return response.data;
}

export const createBankAccount = async (bankAccountData) => {
  console.log(bankAccountData);
  
  const response = await axiosInstance.post("/api/bank-accounts/ba", {bankAccountData});
  return response.data;
}