import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickname: null,
  email: null,
  photo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});
export const userSelector = (state) => state.auth;
// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const authReducer = authSlice.reducer;