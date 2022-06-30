import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import cartReducer from "./features/cart/cartSlice";
import userInfoReducer from "./features/user/userInfoSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailReducer,
    cart: cartReducer,
    userInfo: userInfoReducer,
  },
});
