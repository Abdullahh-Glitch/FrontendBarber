import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    managerbtn : [
    { name: "Home", page: "/manager" },
    { name: "Products", page: "/manager/products" },
    { name: "Sales", page: "/manager/sales" },
  ],
    salesmanbtn : [{}],
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
});

export default navbarSlice.reducer;
