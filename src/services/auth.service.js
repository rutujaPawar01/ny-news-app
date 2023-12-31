import { axiosInstance } from "../axios/axios";
import { addEmailToLocalStorage, addTokenToLocalStorage, getEmailFromLocalStorage } from "../utils/util";
const API_URL = "http://localhost:8000/auth";

const register = (username, email, password) => {
    return axiosInstance.post(API_URL + "/register", {
        username,
        email,
        password,
    });
};

const login = (email, password) => {
    return axiosInstance
        .post(API_URL + "/login", {
            email,
            password,
        }, { withCredentials: true })
        .then((response) => {
            if (response.data.access_token) {
                addTokenToLocalStorage(response.data.access_token || '');
                addEmailToLocalStorage(email);
            }

            return response.data;
        }).catch((e) => {
            console.log("Error", e);
        });
};

const logout = () => {
    localStorage.removeItem("accessToken");
};

export const refreshToken = async () => {
    try {
        const email = getEmailFromLocalStorage();
        const resp = await axiosInstance.post(API_URL + "/refresh", {
            email,
        }, { withCredentials: true });
        console.log("refresh token", resp.accessToken);
        if (resp?.data?.accessToken) addTokenToLocalStorage(resp.data.accessToken);
        return resp.data.accessToken;
    } catch (e) {
        console.log("Error", e);
    }
};

export default {
    register,
    login,
    logout,
};