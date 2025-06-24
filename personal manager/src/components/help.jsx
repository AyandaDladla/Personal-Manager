import React from "react";
import NavBar from "../routes/navbar";

function Help({ onLogout }) {
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
