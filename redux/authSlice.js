const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn(state, action) {
      const email = localStorage.getItem("UserEmail");
      state.user = email;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice;
