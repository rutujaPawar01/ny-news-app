import axios from "axios";
const API_URL = "http://localhost:8000/auth";

//Move this to separate file

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accessToken") || '';
}

const addTokenToLocalStorage = (token) => {
    localStorage.setItem("accessToken", JSON.stringify(token));
}

const getEmailFromLocalStorage = () => {
    return localStorage.getItem("Email") || '';
}

const addEmailToLocalStorage = (email) => {
    localStorage.setItem("Email", JSON.stringify(email));
}

axios.interceptors.response.use(
    async (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const resp = await refreshToken();

            const access_token = resp.access_token;

            addTokenToLocalStorage(access_token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${access_token}`;
            // return customFetch(originalRequest);
            return originalRequest;
        }
        return Promise.reject(error);
    }
);
//-------


const register = (email, password) => {
    return axios.post(API_URL + "register", {
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                addTokenToLocalStorage(response.access_token);
                addEmailToLocalStorage(email);
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("accessToken");
};

const refreshToken = async () => {
    try {
        const email = getEmailFromLocalStorage();
        const resp = axios.post(API_URL + "auth/refresh", {
            email,
        });
        console.log("refresh token", resp.access_token);
        addTokenToLocalStorage(resp.access_token);
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