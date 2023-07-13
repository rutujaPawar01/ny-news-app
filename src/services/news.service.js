import { axiosInstance } from "../axios/axios";
const API_URL = "http://localhost:8000/ny-news";

const getWorldNews = () => {
    return axiosInstance.get(API_URL + "/world")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.log("Error", e);
        });
};

const getScienceNews = () => {
    return axiosInstance.get(API_URL + "/science")
        .then((response) => {
            return response.data;
        })
        .catch((e) => {
            console.log("Error", e);
        });
};

const getNewsDetail = (idString) => {
    return axiosInstance.get(`${API_URL}/article/search?fq=web_url:("${idString}")`)
        .then((response) => {
            console.log("detail data", response.data?.response?.docs?.[0]);
            return response.data?.response?.docs?.[0];
        })
        .catch((e) => {
            console.log("Error", e);
        });
};

export default {
    getWorldNews,
    getScienceNews,
    getNewsDetail
};