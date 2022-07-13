import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import ProductScreen from "./screens/ProductScreen";
import Homescreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminProducts from "./screens/AdminProducts";
import AdminUsers from "./screens/AdminUsers";
import AdminOrders from "./screens/AdminOrders";
import AdminCarts from "./screens/AdminCarts";
import AdminEditProduct from "./screens/AdminEditProduct";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homescreen />} />
            <Route path="product/:productId" element={<ProductScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="orders" element={<OrdersScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="register" element={<SignupScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/products/:productId" element={<AdminEditProduct />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/orders" element={<AdminOrders />} />
            <Route path="admin/carts" element={<AdminCarts />} />
            <Route
              path="*"
              element={
                <div className="mt-28 text-center">
                  <p>404!</p>
                  <p>Tidak ada apa apa di sini kawan</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
