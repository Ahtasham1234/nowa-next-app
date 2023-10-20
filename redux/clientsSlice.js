const { createSlice } = require("@reduxjs/toolkit");

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    allClients: [],
  },
  reducers: {
    getAllClients(state, action) {
      state.allClients = action.payload.allClients;
    },
  },
});
export const clientsActions = clientsSlice.actions;
export default clientsSlice;
