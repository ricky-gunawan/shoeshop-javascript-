import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productItems: [],
  brand: "all",
  color: "all",
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
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productItems = action.payload;
    },
    [getProducts.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setBrand, setColor } = productsSlice.actions;

export default productsSlice.reducer;
