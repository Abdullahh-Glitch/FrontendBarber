import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isServiceModal: false,
  isServiceProductModel: false,
  isConfirmDialog: false,
  newService: null,
  selectedServiceId: null,
  edit: false,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    openServiceModal: (state) => {
      state.isServiceModal = true;
      state.isServiceProductModel = false;
    },
    closeServiceModal: (state) => {
      state.newService = null;
      state.edit = false;
      state.selectedServiceId = null;
      state.isServiceModal = false;
    },
    openServiceModelEidt: (state, action) => {
      state.isServiceModal = true;
      state.edit = true;
      state.selectedServiceId = action.payload.id;
      state.newService = action.payload;
    },
    openServiceProductModal: (state) => {
      state.isServiceModal = false;
      state.isServiceProductModel = true;
    },

    closeServiceProductModal: (state) => {
      state.isServiceProductModel = false;
      state.edit = false;
      state.newService = null;
      state.selectedServiceId = null;
    },
    serviceAdded: (state, action) => {
      state.newService = action.payload;
    },
    setSelectedServiceId: (state, action) => {
      state.selectedServiceId = action.payload;
    },
    openConfirmDialog: (state, action) => {
      state.newService = null;
      state.isConfirmDialog = true;
      state.selectedServiceId = action.payload;
    },
    closeConfirmDialog: (state) => {
      state.isConfirmDialog = false;
      state.newService = null;
      state.selectedServiceId = null;
    },
  },
});

export const {
  openServiceModal,
  closeServiceModal,
  openServiceModelEidt,
  openServiceProductModal,
  closeServiceProductModal,
  setSelectedService,
  setSelectedServiceId,
  openConfirmDialog,
  closeConfirmDialog,
  serviceAdded,
} = serviceSlice.actions;

export default serviceSlice.reducer;
