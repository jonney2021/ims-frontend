import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkLoginStatus,
  getUserProfile,
  updateProfile,
} from "../../../services/authService";

const initialState = {
  isAuthenticated: false,
  _id: null,
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
      console.log("Fetched user data:", userData);
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating profile
export const updateProfileAsync = createAsyncThunk(
  "users/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(formData);
      return response;
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
      const { _id, username, email, role, photo } = action.payload;
      state.isAuthenticated = true;
      state._id = _id;
      state.username = username;
      state.email = email;
      state.role = role;
      state.photo = photo;
    },
    logout: (state) => {
      // state.isAuthenticated = false;
      // state.username = "";
      // state.email = "";
      // state.role = "";
      // state.photo = "";
      Object.assign(state, initialState);
    },
    updateUserProfile: (state, action) => {
      const { _id, username, email, role, photo } = action.payload;
      state._id = _id || state._id;
      state.username = username || state.username;
      state.email = email || state.email;
      state.role = role || state.role;
      state.photo = photo || state.photo;
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
        state._id = action.payload._id;
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state._id = action.payload._id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.photo = action.payload.photo;

        console.log("Fetched user profile:", action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Failed to fetch user profile:", action.payload);
      })
      .addCase(updateProfileAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state._id = action.payload._id || state._id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.photo = action.payload.photo;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.error = action.payload;
        console.error("Failed to update user profile:", action.payload);
      });
  },
});

export const { setCredentials, logout, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;
