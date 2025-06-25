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
  const { user, setUser, todos, setTodos } = useAppContext();
  const [showRegister, setShowRegister] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Registration
  const handleRegister = (values) => {
    const userWithUsername = { ...values, username: values.firstName };
    // Save to users list
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(userWithUsername);
    localStorage.setItem("users", JSON.stringify(users));
    // Set as current user
    setUser(userWithUsername);
    sessionStorage.setItem("user", JSON.stringify(userWithUsername));
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
      sessionStorage.setItem("user", JSON.stringify(foundUser));
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

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
        registeredUser={registeredUser}
      />
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard userEmail={user.email} onLogout={handleLogout} />,
    },
    {
      path: "/addevent",
      element: <AddEvent userEmail={user.email} onLogout={handleLogout} />,
    },
    {
      path: "/help",
      element: <Help userEmail={user.email} onLogout={handleLogout} />,
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
