import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Layout } from "./layouts/MainLayout";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import Loader from "./components/Loader";
import "./index.scss";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer } from 'react-toastify';
import { PDFViewer } from "@react-pdf/renderer";


const LazyApp = lazy(() => import("./App"));

// configureDatabase()
ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <Suspense fallback={<Loader />}>
      <Layout>
        <LazyApp />
      </Layout>
    </Suspense>
  </Provider>,


  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
