import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/dashboard";
import AddEvent from "./components/addevent";
import Help from "./components/help";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/login";
import { AppProvider, useAppContext } from "./components/AppContext";

function App() {
  const { user, setUser } = useAppContext();
  const [showRegister, setShowRegister] = useState(false);

  // Registration
  const handleRegister = (values) => {
    const userWithUsername = { ...values, username: values.firstName };
    // Save to users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(userWithUsername);
    localStorage.setItem("users", JSON.stringify(users));
    // Set as current user
    setUser(userWithUsername);
    localStorage.setItem("user", JSON.stringify(userWithUsername)); // <-- changed
    setShowRegister(false);
  };

  // Login
  const handleLogin = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser)); // <-- changed
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // <-- changed
    setUser(null);
  };

  // Show registration or login if not logged in
  if (!user) {
    if (showRegister) {
      return (
        <div>
          <RegistrationForm onRegister={handleRegister} />
          <button onClick={() => setShowRegister(false)}>Back to Login</button>
        </div>
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // Router for logged-in users
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard onLogout={handleLogout} />,
    },
    {
      path: "/addevent",
      element: <AddEvent onLogout={handleLogout} />,
    },
    {
      path: "/help",
      element: <Help onLogout={handleLogout} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </StrictMode>
  );
}
