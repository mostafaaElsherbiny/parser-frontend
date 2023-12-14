import axios from "axios";
import { HOST } from "@/constants/host";
import { getToken } from "@/utils/authLocalStorage";
import { TOKEN } from "@/constants/token";

const makeRequest = axios.create({
  baseURL: HOST + "/",
  params: "",
});

makeRequest.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
      config.headers.Accept = "application/json";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

makeRequest.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    if (error && error.response) {
      if (
        error.response.status === 401 &&
        window.location.pathname !== "/login"
      ) {
        localStorage.removeItem(TOKEN);
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default makeRequest;
