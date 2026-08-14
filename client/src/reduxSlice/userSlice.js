import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk
export const getUser = createAsyncThunk(
  "user/getUser", // ✅ required action type
  async () => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));

    const res = await axios.get("http://localhost:5000/login", {
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