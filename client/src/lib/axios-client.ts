import axios from "axios";

const options = {
    baseURL: "http://127.0.0.1:8000/api/v1",
    withCredentials: false,
    timeout: 10000,

};

const API = axios.create(options);

export const APIRefresh = axios.create(options);

APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { data, status } = error.response;
        console.log(data, "data");
        if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
            try {
                await APIRefresh.get("/auth/refresh");
                return APIRefresh(error.config);
            } catch (error) {
                console.log(error);
                window.location.href = "/";
            }
        }
        return Promise.reject({
            ...data,
        });
    }
);

export default API;
