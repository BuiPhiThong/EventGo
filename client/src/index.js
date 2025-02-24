import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux_toolkit/store";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={3000} // Thời gian đóng tự động
      />
      <App />
    </BrowserRouter>
  </Provider>
);
