import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productDetail: {},
  isLoading: true,
};

export const getProductDetail = createAsyncThunk("product/getProductDetail", async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

const productDetailSice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productDetail = action.payload;
    },
    [getProductDetail.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export default productDetailSice.reducer;
