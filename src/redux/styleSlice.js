import {createSlice} from '@reduxjs/toolkit';

const styleSlice = createSlice({
  name: 'style',
  initialState: {selectedStyle: null},
  reducers: {
    updateStyle: (state, action) => {
      state.selectedStyle = action.payload;
      // console.log('style::', state.selectedStyle);
    },
    // eslint-disable-next-line no-undef
    resetStyle: () => initialState,
  },
});

export const {updateStyle, resetStyle} = styleSlice.actions;

export default styleSlice.reducer;
