import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountId : null,
    selectedCategoryId : null,
};

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        setAccountId: (state, action) => {
            state.accountId = action.payload;
        },
        setInvoiceCategoryId : (state,action) => {
            state.selectedCategoryId = action.payload;
        }
    },
});

export const {
    setAccountId,
    setInvoiceCategoryId,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;