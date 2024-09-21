import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkLoginStatus } from "../../../services/authService";

const initialState = {
  isAuthenticated: false,
  username: "",
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
      console.log("Check auth status result:", userData);
      if (userData) {
        return userData;
      }
      return rejectWithValue("Not authenticated");
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
      const { username, role, photo } = action.payload;
      state.isAuthenticated = true;
      state.username = username;
      state.role = role;
      state.photo = photo;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.role = "";
      state.photo = "";
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
        state.role = action.payload.role;
        state.photo = action.payload.photo;
        console.log("Auth state updated after check:", state);
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.username = "";
        state.role = "";
        state.photo = "";
        console.log("Auth check rejected:", action.payload);
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
