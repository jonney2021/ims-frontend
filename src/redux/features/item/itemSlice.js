import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createItem,
  deleteItem,
  getItemByCode,
  getItemById,
  getItems,
  getLowStockItems,
  updateItem,
} from "../../../services/itemService";
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

// Delete an item
export const deleteItemAsync = createAsyncThunk(
  "items/deleteItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await deleteItem(itemId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get a single item by ID
export const getItemByIdAsync = createAsyncThunk(
  "items/getItemById",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await getItemById(itemId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get a single item by item code
export const getItemAsync = createAsyncThunk(
  "items/getItem",
  async (itemCode, { rejectWithValue }) => {
    try {
      const response = await getItemByCode(itemCode);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update an item
export const updateItemAsync = createAsyncThunk(
  "items/updateItem",
  async ({ itemId, itemData }, { rejectWithValue }) => {
    try {
      const response = await updateItem(itemId, itemData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching low stock items
export const getLowStockItemsAsync = createAsyncThunk(
  "items/getLowStockItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getLowStockItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  lowStockItems: [],
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
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(getItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.item = action.payload;
        state.message = "Item updated successfully";
        toast.success("Item updated successfully");
      })
      .addCase(updateItemAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getItemByIdAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItemByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.item = action.payload;
      })
      .addCase(getItemByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getLowStockItemsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLowStockItemsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.lowStockItems = action.payload;
      })
      .addCase(getLowStockItemsAsync.rejected, (state, action) => {
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
export const selectCurrentItem = (state) => state.item.item;
export const selectLowStockItems = (state) => state.item.lowStockItems;
export default itemSlice.reducer;
