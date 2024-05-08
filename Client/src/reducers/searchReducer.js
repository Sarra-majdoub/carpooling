import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.text = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
