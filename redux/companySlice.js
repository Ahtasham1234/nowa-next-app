const { createSlice } = require("@reduxjs/toolkit");

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyId: null,
    company: null,
  },
  reducers: {
    company(state, action) {
      console.log("action", action);
      const id = localStorage.getItem("RUC");
      state.companyId = id;
      console.log(action.payload);
      state.company = action.payload?.company;
    },
  },
});
export const companyActions = companySlice.actions;
export default companySlice;
