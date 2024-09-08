import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  username: localStorage.getItem("username") || "User",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { isAuthenticated, username } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.username = username;
      localStorage.setItem("isAuthenticated", isAuthenticated);
      localStorage.setItem("username", username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "User";
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
