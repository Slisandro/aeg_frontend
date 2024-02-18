import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:3000"
});

export default instanceAxios;