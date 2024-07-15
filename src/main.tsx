import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== "toggle") {
    return;
  }

  const timerApp = document.getElementById("timer-app");
  if (timerApp) {
    timerApp.remove();
    return;
  }

  const appRoot = document.createElement("div");
  appRoot.id = "timer-app";
  document.body.appendChild(appRoot);

  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
