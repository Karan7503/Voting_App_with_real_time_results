import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default API;
