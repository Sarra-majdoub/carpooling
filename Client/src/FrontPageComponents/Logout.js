import React from "react";
import "./NavBar.css";

function Logout() {
  const handleLogout = () => {
    localStorage.setItem("userId", null);

    window.location.href = "/login";
  };
  return (
    <button class="logout-button1" onClick={handleLogout}>
      Logout
    </button>
  );
}
export default Logout;
