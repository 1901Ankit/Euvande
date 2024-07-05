import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  make: {},
  model: {},
  specification: {},
};
export const CarInformation = createSlice({
  name: "CarInformation",
  initialState,
  reducers: {
    setVehicleInformation: (state, actions) => {
      return (state = actions.payload);
    },
    removeCarInformation: (state) => {
      return (state = initialState);
    },
  },
});

export const { setVehicleInformation, removeCarInformation } = CarInformation.actions;
export default CarInformation.reducer;
