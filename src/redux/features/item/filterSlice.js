import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredItems: [],
  searchTerm: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    FILTER_ITEMS: (state, action) => {
      const { items, searchTerm } = action.payload;
      state.filteredItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  },
});

export const { setSearchTerm, FILTER_ITEMS } = filterSlice.actions;
export const selectSearchTerm = (state) => state.filter.searchTerm;
export const selectFilteredItems = (state) => state.filter.filteredItems;

export default filterSlice.reducer;
