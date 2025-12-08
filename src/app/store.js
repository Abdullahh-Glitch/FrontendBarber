import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Features/productSlice';
import authReducer from '../Features/authSlice';
import navbar from '../Features/navbarSlice';
import services from '../Features/serviceSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth : authReducer,
    navbar : navbar,
    services : services,
  },
});

export default store;