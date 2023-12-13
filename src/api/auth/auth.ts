import makeRequest from "../makeRequest";
import axios, { AxiosResponse } from "axios";
import { HOST } from "../../constants/host";
// import {IUser} from "../../interfaces/auth";

const AS = "auth";
export function authApi(data: { email: string; password: string }) {
  return axios.post(AS + "/login", data, {
    baseURL: HOST,
  });
}

export function registerApi(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  return axios.post(AS + "/register", data, {
    baseURL: HOST,
  });
}
// export function getUserInfo() {
//     return makeRequest.get('/user/info').then((response: AxiosResponse<{data: IUser}>) => response.data.data)
// }

// export function passwordResetApi (data: {password: string, password_confirmation:string}) {
//     return makeRequest.post('/change-password', data)
// }
