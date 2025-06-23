import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div>
      <h1>Personal Manager</h1>
      <Dashboard />
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
