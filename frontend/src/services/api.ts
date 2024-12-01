import { BACKEND_URL } from "@env";
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.18.46:3010/livros",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("Base URL em uso:", "http://192.168.18.46:3010/");


export default api;
