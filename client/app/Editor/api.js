import axios from "axios";
import { LANG_VERSIONS } from "./components/constants";

const API = axios.create({
  baseURL: "http://localhost:8080",
});
export const executecode = async (language, sourcecode) => {
  const response = await API.post("/code/macha/v1", {
    code: sourcecode,
  });
  return response.data;
};
