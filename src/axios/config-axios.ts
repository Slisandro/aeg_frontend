import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: process.env.VITE_API_URL ?? "http://localhost:3000"
});

export default instanceAxios;