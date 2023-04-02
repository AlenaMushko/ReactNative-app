import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  userPhoto: null,
  stateChange: false,
  likes:0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      userPhoto: payload.userPhoto,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => ({
      userId: null,
      login: null,
      email: null,
      userPhoto: null,
      stateChange: false,
      likes:0,
    }),
    incrementLikes:(state, { payload })=>({
      ...state,
      likes: payload.likes,
  }),
},
});

export const userSelector = (state) => state.auth;
// Action creators are generated for each case reducer function
export const { updateUserProfile, authStateChange, authSignOut , incrementLikes} =
  authSlice.actions;

export const authReducer = authSlice.reducer;
