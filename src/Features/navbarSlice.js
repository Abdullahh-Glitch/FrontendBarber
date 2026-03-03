import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    managerbtn : [
    { name: "Home", page: "/manager" },
    { name: "Accounts", page: "/manager/accounts" },
    { name: "Products", page: "/manager/products" },
    { name: "Services", page: "/manager/services" },
    { name: "Purchase", page: "/manager/purchase", categoryId : 1 },
  ],
    salesmanbtn : [{}],
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
});

export default navbarSlice.reducer;
