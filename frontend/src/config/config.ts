// src/config/config.ts

import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});