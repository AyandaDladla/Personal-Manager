import React from "react";
import NavBar from "../routes/navbar";
import { useAppContext } from "./AppContext";

function Help({ onLogout }) {
  const { todos, setTodos, user } = useAppContext();
  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <NavBar />
      <div>
        <div>
          <h1>Help</h1>
        </div>
      </div>
    </>
  );
}

export default Help;
