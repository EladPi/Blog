import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',       // Current search query
  results: [],     // IDs of posts that match the search query
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
  }
});


//SELECTORS
// Get the current search query
export const selectSearchQuery = state => state.search.query;

// Get the search results as an array of post IDs
export const selectSearchResults = state => state.search.results;

// Get the full details of the search results 
// (assuming you have a `posts` slice structured like: { byId: {...}, allIds: [...] })
export const selectDetailedSearchResults = state => 
  state.search.results.map(postId => state.posts.byId[postId]);


export const { 
  updateQuery, 
  setSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
