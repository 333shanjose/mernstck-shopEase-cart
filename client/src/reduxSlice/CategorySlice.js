import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API=process.env.REACT_APP_API_URL

// Fetch categories
export const getCategories = createAsyncThunk(
  "api/categories",
  async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    const res = await axios.get(`${API}/admin/categories`,
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

//categorySlice

const categorySlice=createSlice({
    name:"category",
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getCategories.pending, (state, action) => {
            state.loading = true;
          })
          builder
          .addCase(getCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.items=action.payload
          })

          .addCase(getCategories.rejected, (state, action) => {
            state.loading = false;
            state.error=action.error.message
          })

}})

export default categorySlice.reducer;