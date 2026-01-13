import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAccountModal: false,
    isConfirmDialog: false,

    selectedAccount: null,
    selectedAccountId: null,
};

const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        openAccountModal: (state) => {
            state.isAccountModal = true;
        },

        closeAccountModal: (state) => {
            state.isAccountModal = false;
            state.selectedAccount = null;
            state.selectedAccountId = null;
        },

        openAccountModalEdit: (state, action) => {
            state.isAccountModal = true;
            state.selectedAccount = action.payload.account;
        },
        
        openConfirmDialog: (state,action) => {
            state.isConfirmDialog = true;
            state.selectedAccountId = action.payload;
        },

        closeConfirmDialog: (state) => {
            state.isConfirmDialog = false;
            state.selectedAccountId = null;
        },
    },
});

export const {
    openAccountModal,
    closeAccountModal,
    openAccountModalEdit,
    openConfirmDialog,
    closeConfirmDialog,
} = accountSlice.actions;
export default accountSlice.reducer;