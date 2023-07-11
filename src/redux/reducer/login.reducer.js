import { IS_LOGGED_IN } from "../action-type/login.action-types";
import { ADD_ITEM, DELETE_ITEM } from "../action-type/news.action-types";

const initialState = {
    isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: state.numOfItems + 1,
            };

        case DELETE_ITEM:
            return {
                ...state,
                numOfItems: state.numOfItems - 1,
            };
        default:
            return state;
    }
};

export default loginReducer;