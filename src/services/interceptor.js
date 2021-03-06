import { TOKEN_KEY } from "../configs/constant";
import API from ".";

const interceptor = {
  setupInterceptors: (store) => {
    API.interceptors.request.use(
      (request) => {
        request.headers.common["Accept"] = `application/json`;
        request.headers.common["Access-Control-Allow-Origin"] = "*";
        const token = localStorage.getItem(TOKEN_KEY)
        console.log("Interseptor:",token)
        if (localStorage.getItem(TOKEN_KEY)) {
          request.headers.common.Authorization = `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
        return request;
      },
      (error) => {
        console.log("request.interceptors error", error);
        return Promise.reject(error);
      }
    );

    API.interceptors.response.use(
      (response) => {
        console.log('interceptors ==>>',response);
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(response);
        }
      },
      (error) => {
        if (error && error.response.status) {
          switch (error.response.status) {
            case 401:
              store.dispatch({ type: "PURGE_AUTH" });
              // localStorage.removeItem(TOKEN_KEY);
              break;
            default:
              break;
          }
        }
        return Promise.reject(error.response.data);
      }
    );
  },
};

export default interceptor;
