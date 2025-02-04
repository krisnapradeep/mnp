// src/config/config.ts
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}` 

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL, 
});