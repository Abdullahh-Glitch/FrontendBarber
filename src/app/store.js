import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Features/productSlice';
import authReducer from '../Features/authSlice';
import navbar from '../Features/navbarSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth : authReducer,
    navbar : navbar,
  },
});

export default store;