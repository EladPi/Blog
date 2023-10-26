
import { createSlice } from '@reduxjs/toolkit';
import { subjectsData } from '../data/subjectsData';


//localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('subjects');
    if (serializedState === null) {
      return undefined;
    }
    const loadedState = JSON.parse(serializedState);
    return loadedState;
  } catch (err) {
    return undefined;
  }
};

export const saveSubjectsState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('subjects', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};


const initialState=subjectsData;


const persistedState = loadState() || initialState;





const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: persistedState,
  reducers: {
    addSubject: (state, action) => {
      const { id, name, description, forumId } = action.payload;
      state.byId[id] = { id, name, description, forumId, posts: [] };
      state.allIds.push(id);
    },
    deleteSubject: (state, action) => {
      const id = action.payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(subjectId => subjectId !== id);
    },
    updateSubject: (state, action) => {
      const { id, name, description, forumId } = action.payload;
      const subject = state.byId[id];
      if (subject) {
        if (name) subject.name = name;
        if (description) subject.description = description;
        if (forumId) subject.forumId = forumId;
      }
    },
    addPostToSubject: (state, action) => {
      const { subjectId, postId } = action.payload;
      state.byId[subjectId].posts.push(postId);
    },
    removePostFromSubject: (state, action) => {
      const { subjectId, postId } = action.payload;
      state.byId[subjectId].posts = state.byId[subjectId].posts.filter(id => id !== postId);
    }
    // Other reducers as needed
  }
});



//SELECTORS
// Get all subjects
export const selectAllSubjects = state => state.subjects.allIds.map(id => state.subjects.byId[id]);

// Get a specific subject by ID
export const selectSubjectById = (state, subjectId) => state.subjects.byId[subjectId];

// Get all posts associated with a subject
export const selectPostsForSubject = (state, subjectId) => {
  const subject = selectSubjectById(state, subjectId);
  if (!subject) return [];
  return subject.posts.map(postId => state.posts.byId[postId]); // Assuming you have a similar structure for posts
};



export const { 
  addSubject, 
  deleteSubject, 
  updateSubject, 
  addPostToSubject, 
  removePostFromSubject 
} = subjectsSlice.actions;

export default subjectsSlice.reducer;
