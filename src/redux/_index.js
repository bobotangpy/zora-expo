import authReducer from './authSlice';
import mainCatReducer from './mainCatSlice';
import subCatReducer from './subCatSlice';
import styleReducer from './styleSlice';
import productsDataReducer from './productsDataSlice';
import cartReducer from './cartSlice';
import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    mainCat: mainCatReducer,
    subCat: subCatReducer,
    style: styleReducer,
    productsData: productsDataReducer,
    cart: cartReducer,
  },
  middleware: [thunk, logger],
});

console.log(':::::INITIAL AUTH:::::', reduxStore.getState().auth);
