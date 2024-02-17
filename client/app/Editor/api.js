import axios from "axios";
import { LANG_VERSIONS } from "./components/constants";

let API = null;

function createAPI(ServerApi) {
  const AxiosAPI = axios.create({
    baseURL: ServerApi,
  });
  API = AxiosAPI;
}

export const executecode = async (language, sourcecode, ServerAPI) => {
  if (API === null) {
    createAPI(ServerAPI);
  }
  const response = await API.post("/code/macha/v1", {
    code: sourcecode,
  });
  return response.data;
};
