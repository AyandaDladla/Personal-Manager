import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/dashboard";
import AddEvent from "./components/addevent";
import Help from "./components/help";
import { TodoProvider } from "./components/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/addevent",
    element: <AddEvent />,
  },
  {
    path: "/help",
    element: <Help />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </StrictMode>
);
