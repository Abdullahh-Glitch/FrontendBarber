import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountId : null,
    selectedCategoryId : null,

    selectedEmployeeId : null,
    selectedCustomerId : null,
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
        setSelectedEmployeeId: (state, action) => {
            state.selectedEmployeeId = action.payload;
        },
        setSelectedCustomerId: (state, action) => {
            state.selectedCustomerId = action.payload;
        },
        removeAccountId: (state) => {
            state.accountId = null;
            state.selectedEmployeeId = null;
            state.selectedCustomerId = null;
        },
    },
});

export const {
    setAccountId,
    setInvoiceCategoryId,
    setSelectedEmployeeId,
    setSelectedCustomerId,
    removeAccountId,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;