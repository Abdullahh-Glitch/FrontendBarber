import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../Features/productSlice';
import authReducer from '../Features/authSlice';
import navbarReducer from '../Features/navbarSlice';
import servicesReducer from '../Features/serviceSlice';
import accountReducer from '../Features/accountSlice';
import invoiceReducer from '../Features/invoiceSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth : authReducer,
    navbar : navbarReducer,
    services : servicesReducer,
    accounts : accountReducer,
    invoice : invoiceReducer,
  },
});

export default store;