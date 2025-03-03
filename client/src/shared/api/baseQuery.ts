import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});
