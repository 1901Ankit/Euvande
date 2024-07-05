import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  id: "",
  makeId: "",
  variantId: "",
};

export const carInfoSlice = createSlice({
  name: "CarInfo",
  initialState,
  reducers: {
    setCarDetails: (state, actions) => {
      return (state = actions.payload);
    },
    removeCarDetails: (state) => {
      return (state = initialState);
    },
  },
});

export const { setCarDetails, removeCarDetails } = carInfoSlice.actions;
export default carInfoSlice.reducer;
