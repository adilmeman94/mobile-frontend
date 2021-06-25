import { combineReducers } from "redux";
import themeConfig from "../../configs/themeConfig";

const customizer = (state = themeConfig, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, theme: action.mode };
    case "COLLAPSE_SIDEBAR":
      return { ...state, sidebarCollapsed: action.value };
    case "CHANGE_NAVBAR_COLOR":
      return { ...state, navbarColor: action.color };
    case "CHANGE_NAVBAR_TYPE":
      return { ...state, navbarType: action.style };
    case "CHANGE_FOOTER_TYPE":
      return { ...state, footerType: action.style };
    case "CHANGE_MENU_COLOR":
      return { ...state, menuTheme: action.style };
    case "HIDE_SCROLL_TO_TOP":
      return { ...state, hideScrollToTop: action.value };
    default:
      return state;
  }
};

const customizerReducer = combineReducers({
  customizer,
});

export default customizerReducer;
