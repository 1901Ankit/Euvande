import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  email: "",
  login_token: "",
  isAuthenticated: false,
  name: "",
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, actions) => {
      return (state = actions.payload);
    },
    logout: (state) => {
      return (state = initialState);
    },
  },
});

export const { loggedIn, logout } = user.actions;
export default user.reducer;
