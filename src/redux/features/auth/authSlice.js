import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkLoginStatus,
  getUserProfile,
} from "../../../services/authService";

const initialState = {
  isAuthenticated: false,
  username: "",
  email: "",
  role: "",
  photo: "",
  isLoading: false,
  error: null,
};

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const userData = await checkLoginStatus();
      // console.log("Check auth status result:", userData);
      if (userData) {
        return userData;
      }
      return rejectWithValue("Not authenticated");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const userData = await getUserProfile();
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, email, role, photo } = action.payload;
      state.isAuthenticated = true;
      state.username = username;
      state.email = email;
      state.role = role;
      state.photo = photo;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.role = "";
      state.photo = "";
    },
    updateUserProfile: (state, action) => {
      const { username, email, role, photo } = action.payload;
      state.username = username;
      state.email = email;
      state.role = role;
      state.photo = photo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.photo = action.payload.photo;
        // console.log("Auth state updated after check:", state);
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.username = "";
        state.email = "";
        state.role = "";
        state.photo = "";
        console.log("Auth check rejected:", action.payload);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.photo = action.payload.photo;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Failed to fetch user profile:", action.payload);
      });
  },
});

export const { setCredentials, logout, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
