import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiFetch = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔑 VERY IMPORTANT for JWT cookies
  // headers: {
  //   "Content-Type": "application/json",
  // },
});



export default apiFetch;
