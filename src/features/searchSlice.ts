import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
  searchPhrase: "",
};


const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    setSearchPhrase: (state, action) => {
      state.searchPhrase = action.payload;
    },
    clearSearchPhrase: (state) => {
      state.searchPhrase = "";
    },
  },
});

export const { setSearchPhrase, clearSearchPhrase } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;