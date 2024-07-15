import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import globalStyles from "./global.css?inline";
import ShadowRoot from "react-shadow";

const APP_ROOT_ID = "timer-app" as const;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== "toggle") {
    return;
  }

  const timerApp = document.getElementById(APP_ROOT_ID);
  if (timerApp) {
    timerApp.remove();
    return;
  }

  const appRoot = document.createElement("div");
  appRoot.id = APP_ROOT_ID;
  document.body.appendChild(appRoot);

  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      <ShadowRoot.div>
        <App />
        <style type="text/css">{globalStyles}</style>
      </ShadowRoot.div>
    </React.StrictMode>,
  );
});

// const initForDev = () => {
// 	const appRoot = document.getElementById(APP_ROOT_ID);
// 	if (!appRoot) {
// 		return;
// 	}

// 	ReactDOM.createRoot(appRoot).render(
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>,
// 	);
// };

// initForDev();
