import axios from "axios";
const instance = axios.create({
  baseURL: `http://localhost/php-login-minimal-master`,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});
export default instance;
