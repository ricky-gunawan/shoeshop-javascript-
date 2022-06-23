import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import productDetailReducer from "./features/products/productDetailSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailReducer,
  },
});
