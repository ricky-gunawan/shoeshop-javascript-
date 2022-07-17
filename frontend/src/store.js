import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import userReducer from "./features/user/userSlice";
import adminReducer from "./features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productDetailReducer,
    user: userReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["admin/setProductForm"],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // // Ignore these paths in the state
        ignoredPaths: ["admin.product"],
      },
    }),
});
