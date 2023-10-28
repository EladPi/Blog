import { createSlice } from '@reduxjs/toolkit';

const savedCommentsState = JSON.parse(localStorage.getItem('comments')) || {};

const initialState = {
  byId: {},  
  allIds: [],
  ...savedCommentsState
};


const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { postId, authorName, commentId, content } = action.payload;

      if (!state.byId[postId]) {
        state.byId[postId] = {};
      }

      if (!state.byId[postId][authorName]) {
        state.byId[postId][authorName] = {};
      }

      state.byId[postId][authorName][commentId] = content;
      state.allIds.push(commentId);

      localStorage.setItem('comments', JSON.stringify(state));
    },

    deleteComment: (state, action) => {
      const { postId, authorName, commentId } = action.payload;

      if (state.byId[postId] && state.byId[postId][authorName]) {
        delete state.byId[postId][authorName][commentId];
        state.allIds = state.allIds.filter(id => id !== commentId);
      }

      localStorage.setItem('comments', JSON.stringify(state));
    },
    
    updateComment: (state, action) => {
      const { postId, authorName, commentId, content } = action.payload;

      if (state.byId[postId] && state.byId[postId][authorName]) {
        state.byId[postId][authorName][commentId] = content;
      }

      localStorage.setItem('comments', JSON.stringify(state));
    }
  }
});

//SELECTORS
export const selectAllComments = state => {
  const comments = [];
  for (let postId in state.comments.byId) {
    for (let authorName in state.comments.byId[postId]) {
      for (let commentId in state.comments.byId[postId][authorName]) {
        comments.push({
          postId,
          authorName,
          commentId,
          content: state.comments.byId[postId][authorName][commentId]
        });
      }
    }
  }
  return comments;
}

export const selectCommentById = (state, postId, authorName, commentId) => {
  return state.comments.byId[postId]?.[authorName]?.[commentId];
}

export const selectCommentsForPost = (state, postId) => {
  const postComments = state.comments.byId[postId] || {};
  const comments = [];

  for (let authorName in postComments) {
    for (let commentId in postComments[authorName]) {
      comments.push({
        authorName,
        commentId,
        content: postComments[authorName][commentId]
      });
    }
  }

  return comments;
};

export const { 
  addComment, 
  deleteComment, 
  updateComment
} = commentsSlice.actions;

export default commentsSlice.reducer;
