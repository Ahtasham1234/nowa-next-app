const { createSlice } = require("@reduxjs/toolkit");

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyId: null,
  },
  reducers: {
    company(state, action) {
      const id = localStorage.getItem("RUC");
      state.companyId = id;
    },
  },
});
export const companyActions = companySlice.actions;
export default companySlice;
