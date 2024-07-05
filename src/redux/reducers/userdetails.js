import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  name: "",
  email: "",
  phoneNo: "",
  isAuthenticated: false,
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setDetails: (state, actions) => {
      return (state = actions.payload);
    },
    removeDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setDetails, removeDetails } = userInfo.actions;
export default userInfo.reducer;
