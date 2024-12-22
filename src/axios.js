import axios from "axios";
const instance = axios.create({
    baseURL: `https://51.20.254.18/dashboard`,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token");

    return config;
});
export default instance;