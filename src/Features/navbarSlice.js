import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    managerbtn : [
    { name: "Home", page: "/manager" },
    { name: "Accounts", page: "/manager/accounts" },
    { name: "Products", page: "/manager/products" },
    { name: "Bank Accounts", page: "/manager/bank-accounts" },
    { name: "Services", page: "/manager/services" },
    { name: "Purchase Invoice", page: "/manager/purchase", categoryId : 1 },
    { name: "Sales Invoice", page: "/manager/sales", },
  ],
    salesmanbtn : [{}],
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
});

export default navbarSlice.reducer;
