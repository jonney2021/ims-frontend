import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  role: "",
  photo: "",
};

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
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
