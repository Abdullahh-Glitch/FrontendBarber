import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Features/productSlice';
import authReducer from '../Features/authSlice';
import navbarReducer from '../Features/navbarSlice';
import servicesReducer from '../Features/serviceSlice';
import accountReducer from '../Features/accountSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth : authReducer,
    navbar : navbarReducer,
    services : servicesReducer,
    accounts : accountReducer,
  },
});

export default store;