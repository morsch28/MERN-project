import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiUrl;

function setDefaultHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

const httpServices = {
  post: axios.post,
  get: axios.get,
  patch: axios.patch,
  delete: axios.delete,
  put: axios.put,
  setDefaultHeader,
};

export default httpServices;
