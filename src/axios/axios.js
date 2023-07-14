import axios from 'axios';
import { refreshToken } from '../services/auth.service';
import { addTokenToLocalStorage, getTokenFromLocalStorage } from '../utils/util';

export const axiosInstance = axios.create({
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    async (config) => {
        return config;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && !originalRequest?.url?.includes('/auth/login')) {
            originalRequest._retry = true;

            const resp = await refreshToken();

            const access_token = resp?.access_token || '';

            access_token.length > 0 && addTokenToLocalStorage(access_token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;

            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    });

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    async function (error) {
        return Promise.reject(error);
    }
);