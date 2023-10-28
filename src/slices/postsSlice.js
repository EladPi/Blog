
import { createSlice } from '@reduxjs/toolkit';
import { postsData } from '../data/postsData';

//localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('posts');
    if (serializedState === null) {
      return undefined;
    }
    const loadedState = JSON.parse(serializedState);
    return loadedState;
  } catch (err) {
    return undefined;
  }
};

export const savePostsState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('posts', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};


const initialState = postsData;


const persistedState = loadState() || initialState;



const postsSlice = createSlice({
  name: 'posts',
  initialState: persistedState,
  reducers: {
    addPost: (state, action) => {
      const { id, title, content, author } = action.payload;
      state.byId[id] = { id, title, content, author, comments: [] };
      state.allIds.push(id);
    },
    deletePost: (state, action) => {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(postId => postId !== id);
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const post = state.byId[id];
      if (post) {
        if (title) post.title = title;
        if (content) post.content = content;
      }
    },
    addCommentToPost: (state, action) => {
      const { postId, commentId } = action.payload;
      state.byId[postId].comments.push(commentId);
    }

  }
});

//SELECTORS
// Get all posts
export const selectAllPosts = state => state.posts.allIds.map(id => state.posts.byId[id]);

// Get a specific post by ID
export const selectPostById = (state, postId) => state.posts.byId[postId];

//selector for the search function.
export const selectPostsForSearchByTitle = (state, searchQuery) =>
  state.posts.allIds
    .filter(postId => state.posts.byId[postId].title.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(postId => state.posts.byId[postId]);

//selector for the search function.
export const selectPostsForSearchByContent = (state, searchQuery) =>
  state.posts.allIds
    .filter(postId => state.posts.byId[postId].content.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(postId => state.posts.byId[postId]);




export const {
  addPost,
  deletePost,
  updatePost
} = postsSlice.actions;

export default postsSlice.reducer;
