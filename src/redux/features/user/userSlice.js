import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  getAllUsers,
  getUserByName,
  updateUser,
  deleteUser,
} from "../../../services/userService";
import { toast } from "react-toastify";

// Async thunk for registering a user
export const registerUserAsync = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching all users
export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a user by username
export const getUserByNameAsync = createAsyncThunk(
  "users/getUserByName",
  async (username, { rejectWithValue }) => {
    try {
      const response = await getUserByName(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a user
export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a user
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  user: null,
  isLoading: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users.push(action.payload);
        state.message = "User registered successfully";
        toast.success("User registered successfully");
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getUserByNameAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByNameAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(getUserByNameAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
        state.message = "User updated successfully";
        toast.success("User updated successfully");
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { reset } = userSlice.actions;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectAllUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.user;
export default userSlice.reducer;
