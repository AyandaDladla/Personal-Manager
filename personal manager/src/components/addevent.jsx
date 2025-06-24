import React, { useState } from "react";
import { useTodos } from "./Todo";
import NavBar from "../routes/navbar";

const AddEvent = () => {
  const { todos, setTodos } = useTodos();
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

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 500, margin: "2rem auto" }}>
        <h2>Add Todo</h2>
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
      </div>
    </>
  );
};

export default AddEvent;
