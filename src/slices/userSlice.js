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
      if (!state.authorizedUsernames.includes(username)) {
        state.authorizedUsernames.push(username);
      }
      else {
        alert("This username is already registered!")
      }
      localStorage.setItem('user', JSON.stringify(state));
    },
    login: (state, action) => {
      const username = action.payload;
      if (state.authorizedUsernames.includes(username)) {
        console.log(username)
        state.currentUser = username; // You can expand this object with more user details as needed
        state.isAuthenticated = true;
      }
      else {
        alert("This username is not registered! Please register first before proceeding.")
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
export const isUsernameAuthorized = (state, username) => state.user.authorizedUsernames.includes(username);

export const selectAllUsers = (state) => state.user.authorizedUsernames;

export const {
  register,
  login,
  logout,
  updateUserDetails
} = userSlice.actions;

export default userSlice.reducer;
