import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = apiUrl;

axios.defaults.withCredentials = true;

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
