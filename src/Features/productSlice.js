import { createSlice } from "@reduxjs/toolkit";
import OpeningProductStockModel from "../Components/OpeningProductStockModel";

const initialState = {
    isProductModal: false,
    isEditProductModal: false,
    isProductCategoryModal: false,
    isConfirmDialog: false,
    isOpeningProductStockModel: false,

    tempMode : null,
    selectedProduct: null,
    selectedCategory: null,
    selectedProductId: null,
    selectedStockDetail: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        openProductModal: (state) => {
            state.isProductModal = true;
            state.isEditProductModal = false;
            state.isOpeningProductStockModel = false;
        },
        openEditProductModal: (state, action) => {
            state.isEditProductModal = true;
            state.isProductModal = false;
            state.isOpeningProductStockModel = false;
            state.selectedProductId = action.payload.id;
            state.selectedProduct = action.payload.product;
        },
        closeProductModal: (state) => {
            state.isProductModal = false;
            state.isEditProductModal = false;
            state.isOpeningProductStockModel = false;
            state.selectedProductId = null;
            state.selectedProduct = null;
        },

        openOpeningProductStockModel: (state, action) => {
            state.isOpeningProductStockModel = true;
            state.isProductModal = false;
            state.isEditProductModal = false;
            
            state.selectedProductId = action.payload.id || null;
            state.selectedProduct = action.payload.product || null;
        },

        closeOpeningProductStockModel: (state) => {
            state.isOpeningProductStockModel = false;
            state.isProductModal = false;
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
        setSelectedProductId: (state, action) => {
            state.selectedProductId = action.payload;
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
    openOpeningProductStockModel,
    closeOpeningProductStockModel,
    closeProductCategoryModal,
    setSelectedProductId,
    openEditProductModal,
    setSelectedProduct,
    setSelectedCategory,
    openConfirmDialog,
    closeConfirmDialog,
} = productSlice.actions;

export default productSlice.reducer;
