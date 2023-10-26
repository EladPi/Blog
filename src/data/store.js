import { configureStore } from "@reduxjs/toolkit";
import forumsReducer from '../slices/forumsSlice';
import subjectsReducer from '../slices/subjectsSlice';
import postsReducer from '../slices/postsSlice';
import favoritesReducer from '../slices/favoritesSlice';
import userReducer from '../slices/userSlice';
import commentsReducer from '../slices/commentsSlice';
import searchReducer from '../slices/searchSlice';

import { saveFavoritesState } from "../slices/favoritesSlice"; // for error handeling...
import { savePostsState } from "../slices/postsSlice";
import { saveSubjectsState } from "../slices/subjectsSlice";

const store = configureStore({
  reducer: {
    forums: forumsReducer,
    subjects: subjectsReducer,
    posts: postsReducer,
    favorites: favoritesReducer,
    user: userReducer,
    comments: commentsReducer,
    search: searchReducer,
  }
});


//for the favorite slice error handeling.
store.subscribe(() => {
  saveSubjectsState(
    store.getState().subjects
  );

  // Save posts state to localStorage
  savePostsState(
    store.getState().posts
  );

  // Save another part of the state to localStorage
  
  saveFavoritesState(
    store.getState().favorites
  );
});


export default store;
