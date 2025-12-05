// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://localhost:7016/api", // backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default API;
// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7016/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
