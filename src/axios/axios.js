import axios from 'axios';
import { addTokenToLocalStorage, getTokenFromLocalStorage, refreshToken } from '../services/auth.service';

export const axiosInstance = axios.create({});

axiosInstance.interceptors.response.use(
    async (config) => {
        return config;
    },
    async function (error) {
        const originalRequest = error.config;
        // if (error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;

        //     const resp = await refreshToken();

        //     const access_token = resp?.access_token || '';

        //     access_token.length > 0 && addTokenToLocalStorage(access_token);
        //     axios.defaults.headers.common[
        //         "Authorization"
        //     ] = `Bearer ${access_token}`;
        //     // return customFetch(originalRequest);
        //     return originalRequest;
        // }
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
        });