import { combineReducers } from "redux";

import auth from "./auth.reducer";
import message from "./message.reducer";
import news from "./news.reducer";
import search from "./search.reducer";

export default combineReducers({
  auth,
  message,
  news,
  search
});