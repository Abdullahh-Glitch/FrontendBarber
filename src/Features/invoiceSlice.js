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
        },
        removeAccountId: (state) => {
            state.accountId = null;
        },
    },
});

export const {
    setAccountId,
    setInvoiceCategoryId,
    removeAccountId,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;