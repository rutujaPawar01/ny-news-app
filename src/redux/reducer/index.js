import { combineReducers } from "redux";

import auth from "./auth.reducer";
import message from "./message.reducer";
import news from "./news.reducer";

export default combineReducers({
  auth,
  message,
  news
});