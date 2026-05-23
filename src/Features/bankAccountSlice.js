import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBankAccountModal: false,
    isBankConfirmDialog: false,

    selectedBankAccount: null,
    selectedBankAccountId: null,
};

const bankAccountSlice = createSlice({
    name: "bankAccounts",
    initialState,
    reducers: {
        openBankAccountModal: (state) => {
            state.isBankAccountModal = true;
        },

        closeBankAccountModal: (state) => {
            state.isBankAccountModal = false;
            state.selectedBankAccount = null;
            state.selectedBankAccountId = null;
        },

        openBankAccountModalEdit: (state, action) => {
            state.isBankAccountModal = true;
            state.selectedBankAccount = action.payload.account;
        },
        
        openBankConfirmDialog: (state,action) => {
            state.isBankConfirmDialog = true;
            state.selectedBankAccountId = action.payload;
        },

        closeBankConfirmDialog: (state) => {
            state.isBankConfirmDialog = false;
            state.selectedBankAccountId = null;
        },
    },
});

export const {
    openBankAccountModal,
    closeBankAccountModal,
    openBankAccountModalEdit,
    openBankConfirmDialog,
    closeBankConfirmDialog,
} = bankAccountSlice.actions;
export default bankAccountSlice.reducer;