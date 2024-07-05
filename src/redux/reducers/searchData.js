const { createSlice } = require("@reduxjs/toolkit");
let initialState = {
  make: {},
  model: {},
  period: {},
  price: "",
  mileage: "",
  vatDeduction: "",
};
export const SearchData = createSlice({
  name: "SearchData",
  initialState,
  reducers: {
    setSearchData: (state, actions) => {
      return (state = actions.payload);
    },
    removeSearchData: (state) => {
      return (state = initialState);
    },
  },
});
export const { setSearchData, removeSearchData } = SearchData.actions;
export default SearchData.reducer;
