import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "date" : null,
    "time" : null,
    "rating" : null,
    "currency" : null,
    "places" : null,
  "departure" : null,
    "arrival" : null
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDate(state, action) {
      state.date = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setPlaces(state, action) {
      state.places = action.payload;
    },
    setFrom(state, action) {
      state.departure = action.payload;
    },
    setTo(state, action) {
      state.arrival = action.payload;
    },
  }
});

export const { setPlaces, setRating , setFrom, setTo  , setDate, setCurrency, setTime} = filterSlice.actions;
export default filterSlice.reducer;
