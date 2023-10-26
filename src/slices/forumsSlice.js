
import { createSlice } from '@reduxjs/toolkit';
import { forumsData } from '../data/forumsData';

const forumsSlice = createSlice({
    name: 'forums',
    initialState: forumsData,
    reducers: {
        addForum: (state, action) => {
            const { id, name, description } = action.payload;
            state.byId[id] = { id, name, description, subjects: [] };
            state.allIds.push(id);
        },
        deleteForum: (state, action) => {
            const id = action.payload;
            delete state.byId[id];
            state.allIds = state.allIds.filter(forumId => forumId !== id);
        },
        updateForum: (state, action) => {
            const { id, name, description } = action.payload;
            const forum = state.byId[id];
            if (forum) {
                if (name) forum.name = name;
                if (description) forum.description = description;
            }
        },
        addSubjectToForum: (state, action) => {
            const { forumId, subjectId } = action.payload;
            state.byId[forumId].subjects.push(subjectId);
        },
        removeSubjectFromForum: (state, action) => {
            const { forumId, subjectId } = action.payload;
            state.byId[forumId].subjects = state.byId[forumId].subjects.filter(id => id !== subjectId);
        }
    }
});


//SELECTORS
// Get all forums
export const selectAllForums = state => state.forums.allIds.map(id => state.forums.byId[id]);

// Get a specific forum by ID
export const selectForumById = (state, forumId) => state.forums.byId[forumId];

// Get all subjects associated with a forum
export const selectSubjectsForForum = (state, forumId) => {
  const forum = selectForumById(state, forumId);
  if (!forum) return [];
  return forum.subjects.map(subjectId => state.subjects.byId[subjectId]); // Assuming you have a similar structure for subjects
};




export const {
    addForum,
    deleteForum,
    updateForum,
    addSubjectToForum,
    removeSubjectFromForum
} = forumsSlice.actions;

export default forumsSlice.reducer;
