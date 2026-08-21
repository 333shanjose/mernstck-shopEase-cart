import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
        console.log('productslice')
      const response = await axios.get(`${API}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

//fetch search products
 
export const getProductsBykey = createAsyncThunk(
  "product/getProductsBykey",
  async (keyword = "") => {
    const { data } = await axios.get(
      `${API}/products?keyword=${keyword}`
    );

    return data;
  }
);

// fetch productDetails

export const fetchProductById=createAsyncThunk(
  'product/fetchProductById',
  async (id)=>{
   
  const res=await axios.get(`${API}/product/${id}`)
   return res.data
})


const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch products by keyword
      .addCase(getProductsBykey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsBykey.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsBykey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      //fetch productDetails

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;