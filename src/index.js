import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "./store/redux";
import { authActions } from "./store/auth-slice";

const storedIdToken = localStorage.getItem("token");
const storedEmail = localStorage.getItem("email");

// Dispatch login action if data is present
if (storedIdToken && storedEmail) {
  store.dispatch(
    authActions.login({ idToken: storedIdToken, email: storedEmail })
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
