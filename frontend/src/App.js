// import { Outlet, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import AdminEditOrder from "./screens/AdminEditOrder";
import AdminEditProduct from "./screens/AdminEditProduct";
import AdminEditUser from "./screens/AdminEditUser";
import AdminOrders from "./screens/AdminOrders";
import AdminProducts from "./screens/AdminProducts";
import AdminUsers from "./screens/AdminUsers";
import CartScreen from "./screens/CartScreen";
import Homescreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  const userInfo = useSelector((store) => store.user.userInfo);
  return (
    <div className="mx-auto max-w-screen-2xl">
      <AppBar />
      <Routes>
        <Route index element={<Homescreen />} />
        <Route path="product/:productId" element={<ProductScreen />} />
        <Route path="register" element={<SignupScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="cart" element={userInfo ? <CartScreen /> : <Navigate to="/login" />} />
        <Route path="orders" element={<OrdersScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="admin/products" element={<AdminProducts />} />
        <Route path="admin/products/:productId" element={<AdminEditProduct />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/users/:userId" element={<AdminEditUser />} />
        <Route path="admin/orders" element={<AdminOrders />} />
        <Route path="admin/orders/:orderId" element={<AdminEditOrder />} />
        <Route
          path="*"
          element={
            <div className="mt-28 text-center">
              <p>404!</p>
              <p>Tidak ada apa apa di sini kawan</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
