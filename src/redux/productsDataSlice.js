import {createSlice} from '@reduxjs/toolkit';

const productsDataSlice = createSlice({
  name: 'productsData',
  initialState: {
    topsData: [],
    bottomsData: [],
    dressSuitsData: [],
    shoesData: [],
  },
  reducers: {
    updateTopsData: (state, action) => {
      state.topsData = [...action.payload];
    },
    updateBottomsData: (state, action) => {
      state.bottomsData = [...action.payload];
    },
    updateDressSuitsData: (state, action) => {
      state.dressSuitsData = [...action.payload];
    },
    updateShoesData: (state, action) => {
      state.shoesData = [...action.payload];
    },
  },
});

export const {
  updateTopsData,
  updateBottomsData,
  updateDressSuitsData,
  updateShoesData,
} = productsDataSlice.actions;

export default productsDataSlice.reducer;
