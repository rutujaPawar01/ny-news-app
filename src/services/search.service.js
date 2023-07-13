import { axiosInstance } from "../axios/axios";
const API_URL = "http://localhost:8000/ny-news";

const searchedNews = (searchString, page) => {
    return axiosInstance.get(`${API_URL}/article/search?search=${searchString}&page=${page}`)
        .then((response) => {
            console.log("Searched data", response.data?.response);
            return response.data?.response;
        })
        .catch((e) => {
            console.log("Error", e);
        });
};

export default {
    searchedNews
};