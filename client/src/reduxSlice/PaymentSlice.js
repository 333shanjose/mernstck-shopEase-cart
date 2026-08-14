import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Razorpay Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (amount, thunkAPI) => {
    try {
        const token = localStorage.getItem("token");
        console.log(token)
      const response = await axios.post(
        "http://localhost:5000/payment/create-order",
        { amount },
        {
            headers:{
             Authorization: `Bearer ${token}`,
   
            }
           }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to create Razorpay order"
      );
    }
  }
);

// Verify Razorpay Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, thunkAPI) => {
    console.log(paymentData)
    try {
      const token = localStorage.getItem("token");
       
      const response = await axios.post(
        "http://localhost:5000/payment/verify",
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } 

    catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { success: false }
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",

  initialState: {
    loading: false,
    razorpayOrder: null,
    success: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayOrder = action.payload;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;