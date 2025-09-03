import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./styles/globals.css";

const base = import.meta.env.DEV ? "/" : "/factforge/";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${base}sw.js`).catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/factforge"}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
