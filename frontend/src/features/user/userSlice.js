import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
const userCart = JSON.parse(localStorage.getItem("userCart")) || null;
const userOrders = JSON.parse(localStorage.getItem("userOrders")) || null;

const initialState = {
  userInfo,
  userCart,
  userOrders,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.userInfo = action.payload;
    },
    setUserCart: (state, action) => {
      localStorage.setItem("userCart", JSON.stringify(action.payload));
      state.userCart = action.payload;
    },
    setUserOrders: (state, action) => {
      localStorage.setItem("userOrders", JSON.stringify(action.payload));
      state.userOrders = action.payload;
    },
    removeUser: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userCart");
      localStorage.removeItem("userOrders");
      state.userInfo = null;
      state.userCart = null;
      state.userOrders = null;
    },
  },
});

export const { setUserInfo, setUserCart, setUserOrders, removeUser } = userSlice.actions;

export default userSlice.reducer;
