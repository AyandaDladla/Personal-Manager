import React, { useState } from "react";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate || !form.dueTime) return;
    setTodos([
      ...todos,
      {
        ...form,
        completed: false,
        id: Date.now(),
      },
    ]);
    setForm({ title: "", description: "", dueDate: "", dueTime: "" });
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Todo List</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
          style={{ marginRight: 8 }}
        />
        <input
          type="time"
          name="dueTime"
          value={form.dueTime}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ display: "block", marginTop: 8 }}>
          Add Todo
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
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
  );
};

export default Dashboard;
