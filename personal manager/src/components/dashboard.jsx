import React from "react";
import NavBar from "../routes/navbar";
import RegistrationForm from "./RegistrationForm";
import { useEffect } from "react";
import { useAppContext } from "./AppContext";

function Dashboard({ onLogout }) {
  const { todos, setTodos } = useAppContext();

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  // Save todos to localStorage whenever they change
  //useEffect(() => {
  //  localStorage.setItem("todos", JSON.stringify(todos));
  //}, [todos]);

  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <NavBar />
      <div style={{ maxWidth: 500, margin: "2rem auto" }}>
        <h2>Todo List</h2>
        <button
          onClick={removeCompleted}
          style={{
            marginBottom: 16,
            padding: "8px 16px",
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Remove Completed Tasks
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {(todos || []).map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
                background: "#f9f9f9",
                padding: 12,
                borderRadius: 6,
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
                style={{ marginRight: 12 }}
              />
              <div style={{ flex: 1 }}>
                <strong
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </strong>
                <div style={{ fontSize: 14, color: "#555" }}>
                  {todo.description}
                </div>
                <div style={{ fontSize: 12, color: "#888" }}>
                  Due: {todo.dueDate} {todo.dueTime}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
