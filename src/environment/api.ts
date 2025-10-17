import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7016/api", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
