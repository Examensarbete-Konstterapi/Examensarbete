import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5030/api",
});

export default API;
