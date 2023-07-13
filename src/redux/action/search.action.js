import NewsService from "../../services/news.service";
import { LOGIN_FAIL } from "../action-type/login.action-types";
import { WORLD_NEWS, SCIENCE_NEWS, SET_WORLD_NEWS, SET_NEW_DETAIL, SET_NEWS_DETAIL, SET_SCIENCE_NEWS } from "../action-type/news.action-types";

export const getWorldNews = () => (dispatch) => {
  return NewsService.getWorldNews().then((response) => {

    if (response) {
      dispatch({
        type: SET_WORLD_NEWS,
        payload: response,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }

    return Promise.resolve();
  })
};

export const getScienceNews = () => (dispatch) => {
  return NewsService.getScienceNews().then((response) => {

    if (response) {
      dispatch({
        type: SET_SCIENCE_NEWS,
        payload: response,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }

    return Promise.resolve();
  })
};

export const getNewsDetail = (isString) => (dispatch) => {
  return NewsService.getNewsDetail(isString)
    .then((response) => {
      if (response) {
        dispatch({
          type: SET_NEWS_DETAIL,
          payload: response,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
      }

      return Promise.resolve();
    })
};
