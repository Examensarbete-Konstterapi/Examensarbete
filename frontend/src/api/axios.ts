import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5030/api",
});

// Interceptor för att lägga till auth-token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor för att automatiskt loggas ut när token är expired
API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("logout"));
    }

    return Promise.reject(error);
  },
);

export default API;
