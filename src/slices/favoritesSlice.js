import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: {}
};

// Utility Functions for localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return undefined;
    }
    const loadedState = JSON.parse(serializedState);
    return loadedState.favorites || loadedState;
  } catch (err) {
    return undefined;
  }
};

export const saveFavoritesState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('favorites', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};


const persistedState = loadState() || initialState;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: persistedState,
  reducers: {
    addFavorite: (state, action) => {
      const { userId, postId } = action.payload;

      if (!state.users[userId]) {
        state.users[userId] = [];
      }
      
      if (!state.users[userId].includes(postId)) {
        state.users[userId].push(postId);
      }
    },
    removeFavorite: (state, action) => {
      const { userId, postId } = action.payload;
      const index = state.users[userId]?.indexOf(postId);
      
      if (index !== -1) {
        state.users[userId].splice(index, 1);
      }
    },
    clearFavorites: state => {
      return initialState;
    }
  }
});


// SELECTORS
export const selectAllFavorites = state => state.favorites.users;

export const isPostFavorite = (state, userId, postId) =>{
  return state.favorites.users?.[userId]?.includes(postId) || false
};

export const selectFavoritePosts = (state, userId) => {
  const userFavorites = state.favorites.users[userId] || [];
  return userFavorites.map(favoritePostId => state.posts.byId[favoritePostId]).filter(Boolean);
};

export const { 
  addFavorite, 
  removeFavorite,
  clearFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
