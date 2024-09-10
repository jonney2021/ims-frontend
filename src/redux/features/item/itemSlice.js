import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createItem, getItems } from "../../../services/itemService";
import { toast } from "react-toastify";

// Async thunk for creating an item
export const createItemAsync = createAsyncThunk(
  "items/createItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await createItem(itemData);
      return response;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message || "An error occurred. Please try again.";
      return rejectWithValue(message);
    }
  }
);

// Async thunk for fetching all items
export const getItemsAsync = createAsyncThunk(
  "items/getItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  isError: false,
  message: "",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.items.push(action.payload);
        state.message = "Item created successfully";
        toast.success("Item created successfully");
      })
      .addCase(createItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.items = action.payload;
      })
      .addCase(getItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { reset } = itemSlice.actions;
export const selectIsLoading = (state) => state.item.isLoading;
export const selectAllItems = (state) => state.item.items;
export default itemSlice.reducer;
