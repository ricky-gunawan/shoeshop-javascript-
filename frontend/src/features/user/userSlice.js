import { createSlice } from "@reduxjs/toolkit";

const userInfo = JSON.parse(localStorage.getItem("userInfo")) || null;
const userCart = JSON.parse(localStorage.getItem("userCart")) || null;

const initialState = {
  userInfo,
  userCart,
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
    removeUser: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userCart");
      state.userInfo = null;
      state.userCart = null;
    },
  },
});

export const { setUserInfo, setUserCart, removeUser } = userSlice.actions;

export default userSlice.reducer;
