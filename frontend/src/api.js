import axios from "axios";

const apiUrl = "http://localhost:3000/api/";

const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    if(error.response?.status === 401){
        localStorage.removeItem("token");
        window.location = "/login";
    }
    return Promise.reject(error);
})

export default api;