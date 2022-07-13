import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  products: [],
  product: { _id: "", img: "", name: "", price: "", brand: "", color: "", description: "" },
  users: [],
  user: { _id: "", name: "", email: "", address: "", isAdmin: "" },
  orders: [],
  order: { _id: "", user: "", date: "", items: [], totalItems: "", totalPrice: "", address: "", payment: "", isPaid: "" },
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
    return allProducts;
  } catch (error) {
    console.log(error);
  }
});

///////////////////////////////////////////////////////////////////////////////////

export const getAllUsers = createAsyncThunk("admin/getAllUsers", async () => {
  try {
    const resp = await axios.get("/api/admin/users");
    const allUsers = resp.data;
    return allUsers;
  } catch (error) {
    console.log(error);
  }
});

export const getSingleUser = createAsyncThunk("admin/getSingleUser", async (userId) => {
  try {
    const resp = await axios.get(`/api/admin/users/${userId}`);
    const singleUser = resp.data;
    return singleUser;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId) => {
  try {
    const resp = await axios.delete("/api/admin/users", { data: { userId } });
    const allUsers = resp.data;
    return allUsers;
  } catch (error) {
    console.log(error);
  }
});

///////////////////////////////////////////////////////////////////////////////////

export const getAllOrders = createAsyncThunk("admin/getAllOrders", async () => {
  try {
    const resp = await axios.get("/api/admin/orders");
    const allOrders = resp.data;
    return allOrders;
  } catch (error) {
    console.log(error);
  }
});

export const getSingleOrder = createAsyncThunk("admin/getSingleOrder", async (orderId) => {
  try {
    const resp = await axios.get(`/api/admin/orders/${orderId}`);
    const singleOrder = resp.data;
    return singleOrder;
  } catch (error) {
    console.log(error);
  }
});

export const deleteOrder = createAsyncThunk("admin/deleteOrder", async (orderId) => {
  try {
    const resp = await axios.delete("/api/admin/orders", { data: { orderId } });
    const allOrders = resp.data;
    return allOrders;
  } catch (error) {
    console.log(error);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setProductForm: (state, action) => {
      const elemName = action.payload.name;
      const value = action.payload.value;

      state.product[elemName] = value;
    },
    setUserForm: (state, action) => {
      const elemName = action.payload.name;
      const value = action.payload.value;

      state.user[elemName] = value;
    },
    setOrderForm: (state, action) => {
      const elemName = action.payload.name;
      const value = action.payload.value;

      state.order[elemName] = value;
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
    ////
    [getSingleProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    ////
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
    ////
    [getSingleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    ////
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },

    //////////////////////////////////
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    ////
    [getSingleOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    },
    ////
    [deleteOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
  },
});

export const { setProductForm, setUserForm, setOrderForm } = adminSlice.actions;

export default adminSlice.reducer;
