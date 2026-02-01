


import axios from "axios";

const API_BASE_URL = "https://peace-fashion-backend.onrender.com/api";

const apiFetch = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

// 🟢 Add this Interceptor
// apiFetch.interceptors.request.use((config) => {
//   // Check if we are in the browser and get the token
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
//   if (token) {
//     // 🟢 Attach token to Authorization header
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default apiFetch;