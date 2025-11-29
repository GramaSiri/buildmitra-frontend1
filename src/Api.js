// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // points to backend URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;