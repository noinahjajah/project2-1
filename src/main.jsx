import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { JobsProvider } from "./context/JobsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <JobsProvider>
      <App />
    </JobsProvider>
  </React.StrictMode>
);