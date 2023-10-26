// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedState = JSON.parse(localStorage.getItem('user')) || {};

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  authorizedUsernames: [],
  ...savedState,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      const username = action.payload;
      const usernameExists = state.authorizedUsernames.some(registeredUsername => registeredUsername.toLowerCase() === username.toLowerCase());

      if (!usernameExists) {
        state.authorizedUsernames.push(username);
      } else {
        return
      }
      localStorage.setItem('user', JSON.stringify(state));
    },

    login: (state, action) => {
      const username = action.payload;
      const usernameExists = state.authorizedUsernames.some(registeredUsername => registeredUsername === username);

      if (usernameExists) {
        state.currentUser = username;
        state.isAuthenticated = true;
      } else {
        return;
      }
      localStorage.setItem('user', JSON.stringify(state));
    },

    logout: state => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.setItem('user', JSON.stringify(state));
    },
    updateUserDetails: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
      localStorage.setItem('user', JSON.stringify(state));
    }
    // ... potentially more actions
  }
});


//SELECTORS
// Check if the user is authenticated
export const selectIsAuthenticated = state => state.user.isAuthenticated;

// Get the currently logged-in user's details
export const selectCurrentUser = state => state.user.currentUser;

// Check if a specific username is authorized (has registered)
export const isUsernameAuthorized = (state, username) => {
  console.log(state.user.authorizedUsernames)
  return   state.user.authorizedUsernames.includes(username);
}


export const selectAllUsers = (state) => state.user.authorizedUsernames;

export const {
  register,
  login,
  logout,
  updateUserDetails
} = userSlice.actions;

export default userSlice.reducer;