import { axiosInstance } from "./axiosInstance";

export const createInvoice = async (data)=>{

    const {invoiceData, productData} = data;

  const response = await axiosInstance.post("/api/invoices/i",{invoiceData: invoiceData, productData : productData});
  return response.data;
}

export const createSalesInvoice = async (data) => {
  const { invoiceData, transactionData, productData, serviceData } = data;
  
  const response = await axiosInstance.post("/api/invoices/is",{
    invoiceData : invoiceData,
    transactionData : transactionData,
    productData : productData,
    serviceData : serviceData
  });
  return response.data;
}