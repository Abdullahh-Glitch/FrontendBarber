import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Features/productSlice';
import authReducer from '../Features/authSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth : authReducer,
  },
});

export default store;