import { ADD_ITEM, DELETE_ITEM } from "../action/news.action-types";

const initialState = {
    numOfItems: 0,
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                numOfItems: state.numOfItems + 1,
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

export default newsReducer;