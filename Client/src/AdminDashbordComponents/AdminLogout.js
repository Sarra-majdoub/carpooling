import React from "react";
import "./NavbarAdminDashbord.css";

function AdminLogout() {
  const handleLogout = () => {
    localStorage.setItem("userId", null);

    window.location.href = "/login";
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}
export default AdminLogout;
