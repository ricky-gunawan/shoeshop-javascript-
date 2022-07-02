import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailReducer,
    user: userReducer,
  },
});
