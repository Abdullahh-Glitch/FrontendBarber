import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isServiceModal: false,
    isServiceProductModel: false,
    isConfirmDialog: false,

    selectedService: null,
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
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
      state.selectedServiceId = action.payload ? action.payload.id : null;
    },
    openConfirmDialog: (state, action) => {
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
