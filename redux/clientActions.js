import axios from "axios";
import { clientsActions } from "./clientsSlice";
import Env from "@/Env";

export const fetchAllClients = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `${Env.REACT_APP_BACKEND_ENV}/api/client/getAllClient`
      );

      const data = await response.data.findClientAll;

      return data;
    };
    const clientData = await fetchData();
    console.log("clientData", clientData);
    try {
      dispatch(
        clientsActions.getAllClients({
          allClients: clientData || [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};
