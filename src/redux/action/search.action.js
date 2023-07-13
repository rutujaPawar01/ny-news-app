import NewsService from "../../services/news.service";
import searchService from "../../services/search.service";
import { LOGIN_FAIL } from "../action-type/login.action-types";
import { WORLD_NEWS, SCIENCE_NEWS, SET_WORLD_NEWS, SET_NEW_DETAIL, SET_NEWS_DETAIL, SET_SCIENCE_NEWS } from "../action-type/news.action-types";
import { COUNT_SEARCH_NEWS, SET_SEARCH_NEWS } from "../action-type/search.action-types";

export const searchNews = (searchText, page = 0) => (dispatch) => {
  return searchService.searchedNews(searchText, page).then((response) => {

    if (response) {
      dispatch({
        type: SET_SEARCH_NEWS,
        payload: response?.docs,
      });

      dispatch({
        type: COUNT_SEARCH_NEWS,
        payload: response?.meta?.hits,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }

    return Promise.resolve();
  })
};