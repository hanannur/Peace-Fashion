


import axios from "axios";

// const API_BASE_URL = "https://peace-fashion-backend.onrender.com/api";
//const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiFetch = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});



export default apiFetch;