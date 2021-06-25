import { R_TOKEN, TOKEN_KEY } from "../../configs/constant";
import { history } from "../../history";


const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH": {
      // console.log(action.payload);
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    }
    case "PURGE_AUTH": {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(R_TOKEN);
      // localStorage.removeItem(userId);
      history.push("/login");
      return { ...state, currentUser: null, isAuthenticated: false };
    }
    default: {
      return state;
    }
  }
};

export default user;
