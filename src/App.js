import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { Redirect, Router, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { TOKEN_KEY } from "./configs/constant";
import { AuthService } from "./services/api.service";
import Loader from "./components/Loader";
import RouteConfig from "./router";
import { routes, authRoutes } from "./router/routes";
import { history } from "./history";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./views/Seller/viewPdfDetail";

const App = (props) => {
  const [showLoader, setShowLoader] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (localStorage.getItem(TOKEN_KEY)) {
      try {
        const data = await AuthService.getProfile();
        console.log(data);
        dispatch({ type: "SET_AUTH", payload: data });
      } catch {
        dispatch({ type: "PURGE_AUTH" });
      } finally {
        setShowLoader(false);
      }
    } else {
      setShowLoader(false);
      dispatch({ type: "PURGE_AUTH" });
    }
  };

  if (showLoader) return <Loader />;

  let pages = null;
  if (isAuthenticated) {
    pages = authRoutes.map((element) => (
      <RouteConfig
        key={element.name}
        path={element.path}
        component={element.component}
        fullLayout={element.fullLayout}
        exact={element.exact}
      />
    ));
  } else {
    pages = routes.map((element) => (
      <RouteConfig
        key={element.name}
        path={element.path}
        component={element.component}
        fullLayout={element.fullLayout}
        exact={element.exact}
      />
    ));
  }
  return (
    // Set the directory path if you are deploying in sub-folder
    <Router history={history}>
      <Switch>
        {pages}
        <Redirect from="/" to={isAuthenticated ? "/" : "/login"} />
      </Switch>
    </Router>
  );
  
  
};

export default App;
