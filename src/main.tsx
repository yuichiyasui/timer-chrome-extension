import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const appRoot = document.createElement("div");
appRoot.id = "timer-app";
document.body.appendChild(appRoot);

ReactDOM.createRoot(appRoot).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
