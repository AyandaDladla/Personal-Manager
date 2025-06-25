import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [todos, setTodos] = useState([]);

  // Load todos for the logged-in user
  useEffect(() => {
    if (user?.email) {
      const storedTodos = localStorage.getItem(`todos_${user.email}`);
      setTodos(storedTodos ? JSON.parse(storedTodos) : []);
    } else {
      setTodos([]);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos));
    }
  }, [todos, user]);
  return (
    <AppContext.Provider value={{ user, setUser, todos, setTodos }}>
      {children}
    </AppContext.Provider>
  );
}
