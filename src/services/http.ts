import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
});
console.log(import.meta.env.VITE_AXIOS_BASE_URL_USER);

export const userhttp = axios.create({
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL_USER
});