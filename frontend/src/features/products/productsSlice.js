import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: true,
};

export const getProducts = createAsyncThunk("products/getProducts", async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export default productsSlice.reducer;
