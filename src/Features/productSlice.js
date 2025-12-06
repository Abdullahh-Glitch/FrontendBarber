import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProductModal: false,
    isProductCategoryModal: false,
    isConfirmDialog: false,

    selectedProduct: null,
    selectedCategory: null,
    selectedProductId: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        openProductModal: (state) => {
            state.isProductModal = true;
        },
        closeProductModal: (state) => {
            state.isProductModal = false;
            state.selectedProduct = null;
        },

        openProductCategoryModal: (state) => {
            state.isProductCategoryModal = true;
        },
        closeProductCategoryModal: (state) => {
            state.isProductCategoryModal = false;
            state.selectedCategory = null;
        },

        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },

        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        openConfirmDialog: (state,action) => {
            state.isConfirmDialog = true;
            state.selectedProductId = action.payload;
        },
        closeConfirmDialog: (state) => {
            state.isConfirmDialog = false;
            state.selectedProductId = null;
        },
    },
});

export const {
    openProductModal,
    closeProductModal,
    openProductCategoryModal,
    closeProductCategoryModal,
    setSelectedProduct,
    setSelectedCategory,
    openConfirmDialog,
    closeConfirmDialog,
} = productSlice.actions;

export default productSlice.reducer;
