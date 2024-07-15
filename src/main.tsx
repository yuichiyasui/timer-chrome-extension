import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import globalStyles from "./global.css?inline";
import ShadowRoot from "react-shadow";

const APP_ROOT_ID = "timer-app" as const;

const appRoot = document.getElementById(APP_ROOT_ID);

if (import.meta.env.MODE === "development") {
  if (appRoot) {
    ReactDOM.createRoot(appRoot).render(
      <React.StrictMode>
        <ShadowRoot.div>
          <App />
          <style type="text/css">{globalStyles}</style>
        </ShadowRoot.div>
      </React.StrictMode>,
    );
  }
} else {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action !== "toggle") {
      return;
    }

    if (appRoot) {
      appRoot.remove();
      return;
    }

    const root = document.createElement("div");
    root.id = APP_ROOT_ID;
    document.body.appendChild(root);

    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ShadowRoot.div>
          <App />
          <style type="text/css">{globalStyles}</style>
        </ShadowRoot.div>
      </React.StrictMode>,
    );
  });
}
