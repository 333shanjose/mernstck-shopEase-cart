import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    const res = await axios.get("http://localhost:5000/cart",
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    )
    console.log("API Response:", res.data);
    return res.data;
  }
);

// Add to cart
export const addCart = createAsyncThunk(
  "cart/addCart",
  async (productId) => {
    const token = localStorage.getItem("token");
       console.log('add cart think called')
    const res = await axios.post(
      "http://localhost:5000/add-cart",
          { productId },
        {
         headers:{
          Authorization: `Bearer ${token}`,

         }
        }
    );
    return res.data;
  }
);

//update cart
 export const updateQuantity= createAsyncThunk(
   'cart/updateCart',
   async({productId,action}) => {
    console.log(productId, action);
    const token=localStorage.getItem('token')
    const res=await axios.put(
      'http://localhost:5000/cart/update-cart',
          { productId,action },
        {
         headers:{
          Authorization: `Bearer ${token}`,

         }
        }
    )
     return res.data
   }
 )

 //remove cart

 export const  removeCart=createAsyncThunk(
     'cart/remove-cart',
    async (productId)=>{
      const token=localStorage.getItem('token')
      const res=await axios.delete(`http://localhost:5000/cart/remove-cart/${productId}`,
          
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
          
        }
      )
      return res.data
    }

  )
 

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload?.items|| [];
        console.log("Reducer state items:", state.items)
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload?.items|| [];
        console.log("Reducer state items:", state.items)
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.items = action.payload?.items|| []
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      });
  },
});

export default cartSlice.reducer;