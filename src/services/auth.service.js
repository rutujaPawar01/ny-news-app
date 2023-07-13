import { axiosInstance } from "../axios/axios";
const API_URL = "http://localhost:8000/auth";

//Move this to separate file

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken") || '';
}

export const addTokenToLocalStorage = (token) => {
    localStorage.setItem("accessToken", token);
}

export const getEmailFromLocalStorage = () => {
    return localStorage.getItem("Email") || '';
}

export const addEmailToLocalStorage = (email) => {
    localStorage.setItem("Email", JSON.stringify(email));
}

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
        })
        .then((response) => {
            if (response.data.access_token) {
                addTokenToLocalStorage(response.data.access_token || '');
                addEmailToLocalStorage(email);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("accessToken");
};

export const refreshToken = async () => {
    try {
        const email = getEmailFromLocalStorage();
        const resp = axiosInstance.post(API_URL + "/refresh", {
            email,
        });
        console.log("refresh token", resp.access_token);
        if (resp?.access_token) addTokenToLocalStorage(resp.access_token);
        return resp.access_token;
    } catch (e) {
        console.log("Error", e);
    }
};

export default {
    register,
    login,
    logout,
};