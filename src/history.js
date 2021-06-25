import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
