import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import itemReducer from "./features/item/itemSlice";
import categoryReducer from "./features/category/categorySlice";
import filterReducer from "./features/item/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    category: categoryReducer,
    filter: filterReducer,
  },
});
