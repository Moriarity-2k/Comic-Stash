import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ErrorFallback from "./ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary
			fallback={ErrorFallback}
			onReset={() => window.location.replace("/")}
		>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
