import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isServiceModal: false,
    isServiceCategoryModal: false,
    isConfirmDialog: false,

    selectedService: null,
    selectedCategory: null,
    selectedServiceId: null,
};

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        openServiceModal: (state) => {
            state.isServiceModal = true;
        },
        closeServiceModal: (state) => {
            state.isServiceModal = false;
            state.selectedService = null;
        },

        openServiceCategoryModal: (state) => {
            state.isServiceCategoryModal = true;
        },
        closeServiceCategoryModal: (state) => {
            state.isServiceCategoryModal = false;
            state.selectedCategory = null;
        },

        setSelectedService: (state, action) => {
            state.selectedService = action.payload;
        },

        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        openConfirmDialog: (state,action) => {
            state.isConfirmDialog = true;
            state.selectedServiceId = action.payload;
        },
        closeConfirmDialog: (state) => {
            state.isConfirmDialog = false;
            state.selectedServiceId = null;
        },
    },
});

export const {
    openServiceModal,
    closeServiceModal,
    openServiceCategoryModal,
    closeServiceCategoryModal,
    setSelectedService,
    setSelectedCategory,
    openConfirmDialog,
    closeConfirmDialog,
} = serviceSlice.actions;

export default serviceSlice.reducer;
