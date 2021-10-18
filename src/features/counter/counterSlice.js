import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.value.push(action.payload)
    },
    resetFavourites: (state) => {
      state.value = [];
      window.location.reload(true);
    },
  },
});

export const { addToFavourites, resetFavourites } = counterSlice.actions;

export default counterSlice.reducer;
