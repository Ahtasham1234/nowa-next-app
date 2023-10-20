import Env from "@/Env";
import axios from "axios";
import { unitsActions } from "./measurementSlice";

export const fetchMeasurementUnits = () => {
  return async (dispatch) => {
    axios
      .get(`${Env.REACT_APP_BACKEND_ENV}/api/unidades/GetAllDataFormOne`)
      .then((res) => {
        console.log("GetAllData===>>>", res.data.findFormOne);
        // setRows(res.data.findFormOne);
        dispatch(
          unitsActions.getAllMeasurementsUnits({ data: res.data.findFormOne })
        );
      })
      .catch((err) => console.log("Error===>>", err));
  };
};
