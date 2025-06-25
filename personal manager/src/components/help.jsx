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
          <p>
            This is the personal manager, or a todo list. It organises your
            tasks and helps you keep track of what you need to do.
          </p>
          <p>
            To add a task, click on the "Add Todo" button in the navigation bar.
            You can enter a title, description, due date, and due time for your
            task. Once you fill in the required fields, click "Add Todo" to save
            it.
            <p>
              The Dashbord is your home page and it shows you all the tasks you
              still need to complete, once you're done with a task, you can
              click the checkbox next to it to mark it as completed.
            </p>
          </p>
        </div>
      </div>
    </>
  );
}

export default Help;
