const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    RUC: null,
  },
  reducers: {
    signIn(state, action) {
      const email = localStorage.getItem("UserEmail");
      console.log("email", email);
      const RUC = localStorage.getItem("RUC");
      console.log("Ruc", RUC);
      state.email = email;
      state.RUC = RUC;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
