import { configureStore } from "@reduxjs/toolkit";
import clientsSlice from "./redux/clientsSlice";
import measurementUnitSlice from "./redux/measurementSlice";
import authSlice from "./redux/authSlice";
import companySlice from "./redux/companySlice";

const store = configureStore({
  reducer: {
    clients: clientsSlice.reducer,
    units: measurementUnitSlice.reducer,
    auth: authSlice.reducer,
    company: companySlice.reducer,
  },
});

export default store;
