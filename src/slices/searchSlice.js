import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '' 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  }
});


//SELECTORS
// Get the current search query
export const selectSearchQuery = state => state.search.query;


export const { 
  updateQuery
} = searchSlice.actions;

export default searchSlice.reducer;
