import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  email: null,
  userPhoto: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
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
    }),
  },
});

export const userSelector = (state) => state.auth;
// Action creators are generated for each case reducer function
export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
