// src/api/api.js
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

// Attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("access-token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
