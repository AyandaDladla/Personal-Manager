import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./components/dashboard";
import AddEvent from "./components/addevent";
import Help from "./components/help";
import { TodoProvider } from "./components/Todo";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/login";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Save registration data
  const handleRegister = (values) => {
    const userWithUsername = { ...values, username: values.firstName };
    setRegisteredUser(userWithUsername);
    sessionStorage.setItem("username", userWithUsername.username); // Save to session storage
    setShowRegister(false); // Go back to login after registration
  };

  // Compare login details with registration data
  const handleLogin = ({ email, password }) => {
    if (
      registeredUser &&
      email === registeredUser.email &&
      password === registeredUser.password
    ) {
      setUser({ email });
      sessionStorage.setItem("username", registeredUser.username); // Save to session storage
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  const handleLogout = () => setUser(null);

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

  return (
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
