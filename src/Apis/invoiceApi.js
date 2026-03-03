import { axiosInstance } from "./axiosInstance";

export const createInvoice = async (data)=>{

    const {invoiceData, productData} = data;

  const response = await axiosInstance.post("/api/invoices/i",{invoiceData: invoiceData, productData : productData});
  return response.data;
}