import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  products: [],
  product: { _id: "", img: "", name: "", price: "", brand: "", color: "", description: "" },
  users: [],
  orders: [],
  carts: [],
};

export const getAllProducts = createAsyncThunk("admin/getAllProducts", async () => {
  try {
    const resp = await axios.get("/api/admin/products");
    const allProducts = resp.data;
    return allProducts;
  } catch (error) {
    console.log(error);
  }
});
export const getSingleProduct = createAsyncThunk("admin/getSingleProduct", async (productId) => {
  try {
    const resp = await axios.get(`/api/admin/products/${productId}`);
    const singleProduct = resp.data;
    return singleProduct;
  } catch (error) {
    console.log(error);
  }
});
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (productId) => {
  try {
    const resp = await axios.delete("/api/admin/products", { data: { productId } });
    const allProducts = resp.data;
    console.log(allProducts);
    return allProducts;
  } catch (error) {
    console.log(error);
  }
});
export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  try {
    const resp = await axios.get("api/admin/users");
    const allUsers = resp.data;
    return allUsers;
  } catch (error) {
    console.log(error);
  }
});
export const getAllOrders = createAsyncThunk("admin/getAllOrders", async () => {
  try {
    const resp = await axios.get("api/admin/orders");
    const allOrders = resp.data;
    return allOrders;
  } catch (error) {
    console.log(error);
  }
});
export const getAllCarts = createAsyncThunk("admin/getAllCarts", async () => {
  try {
    const resp = await axios.get("api/admin/carts");
    const allCarts = resp.data;
    return allCarts;
  } catch (error) {
    console.log(error);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setFormEdit: (state, action) => {
      const elemName = action.payload.name;
      const value = action.payload.value;

      state.product[elemName] = value;
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    ////////
    [getSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    ////////
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },

    //////////////////////////////////
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    [getAllCarts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCarts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.carts = action.payload;
    },
  },
});

export const { setFormEdit } = adminSlice.actions;

export default adminSlice.reducer;
