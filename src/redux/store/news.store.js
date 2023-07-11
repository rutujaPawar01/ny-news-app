import { createStore } from "redux";
import newsReducer from "../reducer/news.reducer";

const store = createStore(newsReducer);

export default store;