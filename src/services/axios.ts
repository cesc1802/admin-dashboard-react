import axios from "axios";

import { appConfig } from "@/configs/app";

const axiosInstance = axios.create({
  baseURL: appConfig.baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) =>
    // Do something before request is sent
    config,
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error)
);

export default axiosInstance;
