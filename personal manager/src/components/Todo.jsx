import React, { createContext, useContext, useState } from "react";
import { useAppContext } from "./AppContext";

const TodoContext = createContext();

function TodoComponent() {
  const { todos, setTodos } = useAppContext();
}
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
