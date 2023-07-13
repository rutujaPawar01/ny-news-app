
import { COUNT_SEARCH_NEWS, SET_SEARCH_NEWS } from "../action-type/search.action-types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_NEWS:
      return { searchedNews: payload };

    case COUNT_SEARCH_NEWS:
      return { ...state, searchCount: payload };

    default:
      return state;
  }
}