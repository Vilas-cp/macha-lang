import axios from "axios"
import { LANG_VERSIONS } from "./components/constants";

const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston"
})
export const executecode = async (language,sourcecode) =>{
    const response = await API.post("/execute", {
        language: language,
        version: LANG_VERSIONS[language],
        files: [
          {
            content: sourcecode,
          },
        ],
      });
      return response.data;
    };
