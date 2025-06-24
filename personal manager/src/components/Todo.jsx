import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export function useTodos() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
