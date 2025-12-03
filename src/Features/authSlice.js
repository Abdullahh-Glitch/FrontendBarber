import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    role: null,
    user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth : (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.role;
        state.user = action.payload.user;
    },
    noAuth : (state) => {
        state.isAuthenticated = false;
        state.role = null;
        state.user = null;
    },
  } 
})

export const {
    setAuth,
    noAuth
} = authSlice.actions;

export default authSlice.reducer;