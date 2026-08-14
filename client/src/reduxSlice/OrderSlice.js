import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API='http://localhost:5000'

export const placeOrder= createAsyncThunk(
    'orders/placeorder',
    async(orderData,thunkApi)=>{
        try{
           const token=localStorage.getItem('token')
           const res=await axios.post(
               `${API}/placeorder`,
               orderData,
             {
                 headers:{
                     Authorization:`Bearer ${token}`,
                 },
             }


           )
           return res.data
        } catch(err){
            return thunkApi.rejectWithValue(
                err.response?.data?.message || 'failed to placeorder'
            )
        }

    }
)
  
//get orders

export const fetchOrders=createAsyncThunk(
      'orders/fetchOrders',
    async (_,thunkApi)=>{
      try{
        const token=localStorage.getItem('token')
        const res=await axios.get(`${API}/myOrders`,
         
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data
      }catch(err){
        return thunkApi.rejectWithValue(
            err.response?.data?.message || 'failed to placeorder'
        )
      }
    }
)

// GET ALL Admin  ORDERS
// ===============================

export const fetchAdminOrders = createAsyncThunk(
  "adminOrder/fetchAdminOrders",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.orders;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch orders"
      );
    }
  }
);

// get single order
 
export  const fetchOrderById=createAsyncThunk(
    'orders/fetchOrderByid',
    async(orderId,thunkApi)=>{
        const token=localStorage.getItem('token')
        try{
      const res=await axios.get(`${API}/orders/${orderId}`,
      {
          headers:{
              Authorization:`Bearer ${token}`
          }
      }
      )
      return res.data
    }catch(err){
        return thunkApi.rejectWithValue(
            err.response?.data?.message || 'failed to placeorder'
        )
      }
    }

    

)
 

  // DELETE ORDER
// ===============================

export const deleteAdminOrder = createAsyncThunk(
  "adminOrder/deleteAdminOrder",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/admin/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete order"
      );
    }
  }
);


// ===============================
// UPDATE ORDER STATUS
// ===============================

export const updateAdminOrderStatus = createAsyncThunk(
  "adminOrder/updateAdminOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API}/admin/order/${id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  }
);



  
  const orderSlice = createSlice({
    name: "order",
     initialState :{
      loading: false,
      success: false,
      orders: [],
      order: null,
      error: null,
    },
  
    reducers: {
      clearOrder: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.order = null;
      },
    },
  
    extraReducers: (builder) => {
      builder
  
        // Place Order
        .addCase(placeOrder.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
  
        .addCase(placeOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload.order;
        })
  
        .addCase(placeOrder.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        // Fetch My Orders
        .addCase(fetchOrders.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(fetchOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload.orders;
        })
  
        .addCase(fetchOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

         //fetch admin orders

        .addCase(fetchAdminOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
  
        .addCase(fetchAdminOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        })
  
        .addCase(fetchAdminOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
  
        // Fetch Single Order
        .addCase(fetchOrderById.pending, (state) => {
          state.loading = true;
        })
  
        .addCase(fetchOrderById.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload.order;
        })
  
        .addCase(fetchOrderById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
       
        builder
      .addCase(deleteAdminOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAdminOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })

      .addCase(deleteAdminOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // UPDATE STATUS

    builder
      .addCase(updateAdminOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      .addCase(updateAdminOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    },
  });
  
  export const { clearOrder } = orderSlice.actions;
  
  export default orderSlice.reducer;