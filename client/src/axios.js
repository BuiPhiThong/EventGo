import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_SERVER,
  withCredentials: true, // Bật chế độ gửi cookie cùng với yêu cầu
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const authData = JSON.parse(localStorage.getItem("authData")) || {};
    const accessToken = authData?.accessToken || "";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config; // Phải return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
