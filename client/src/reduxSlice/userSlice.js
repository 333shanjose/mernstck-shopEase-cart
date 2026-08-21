import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

// Async thunk
export const getUser = createAsyncThunk(
  "user/getUser", // ✅ required action type
  async () => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));

    const res = await axios.get(`${API}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

    });


    return res.data.getData;
  }
);
    

// Slice
const userSlice = createSlice({
  name: "user", // ✅ string
  initialState: {
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload; // ✅ correct
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export default userSlice.reducer;