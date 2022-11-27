import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ToastProvider } from "rc-toastr";
import App from "./App";
import "bulma/css/bulma.css";
import axios from "axios";
import "rc-toastr/dist/index.css";

axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ToastProvider
      config={{
        position: "bottom-left",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ToastProvider>
  </React.StrictMode>
);
