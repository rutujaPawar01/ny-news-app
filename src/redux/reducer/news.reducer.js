
import { SCIENCE_NEWS, SET_NEWS_DETAIL, SET_SCIENCE_NEWS, SET_WORLD_NEWS } from "../action-type/news.action-types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_WORLD_NEWS:
      return {
        worldNews: payload,
        auth: {
          isLoggedIn: true,
        }
      };

    case SET_SCIENCE_NEWS:
      return {
        scienceNews: payload,
        auth: {
          isLoggedIn: true,
        }
      };

    case SET_NEWS_DETAIL:
      return {
        article: payload,
        auth: {
          isLoggedIn: true,
        }
      };

    default:
      return state;
  }
}