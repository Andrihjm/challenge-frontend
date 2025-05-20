import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, signout } = authSlice.actions;
export default authSlice.reducer;
