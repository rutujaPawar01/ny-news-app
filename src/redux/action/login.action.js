import { IS_LOGGED_IN, LOGIN } from "../action-type/login.action-types";

const getIsLoggedIn = () => {
  return {
    type: IS_LOGGED_IN,
  };
};

const setLogIn = () => {
  return {
    type: LOGIN,
  };
};

export { addItem, deleteItem };