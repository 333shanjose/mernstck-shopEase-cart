import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// ===============================
// GET ALL USERS
// ===============================

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    }
  }
);


// ===============================
// DELETE USER
// ===============================

export const deleteAdminUser = createAsyncThunk(
  "adminUsers/deleteAdminUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${API}/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  }
);


// ===============================
// BLOCK / UNBLOCK USER
// ===============================

export const toggleBlockAdminUser = createAsyncThunk(
  "adminUsers/toggleBlockAdminUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API}/admin/users/${userId}/toggle-block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update user"
      );
    }
  }
);


// ===============================
// SLICE
// ===============================

const adminUserSlice = createSlice({
  name: "adminUsers",

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    // GET USERS
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // DELETE USER
    builder
      .addCase(deleteAdminUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
      })

      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // BLOCK / UNBLOCK
    builder
      .addCase(toggleBlockAdminUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(toggleBlockAdminUser.fulfilled, (state, action) => {
        state.loading = false;

        const updatedUser = action.payload.user;

        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(toggleBlockAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;