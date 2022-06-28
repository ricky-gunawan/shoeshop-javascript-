import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  isLoading: true,
};

export const getCart = createAsyncThunk("cart/getCart", async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
