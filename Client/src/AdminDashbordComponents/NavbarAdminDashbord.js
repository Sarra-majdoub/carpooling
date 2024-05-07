import React, { useState } from "react";
import RegisterHeader from "../ComponentsRegister/RegisterHeader";

import "./NavbarAdminDashbord.css";
import Logout from "../FrontPageComponents/Logout";
import { useDispatch } from "react-redux";
import { setSearch } from "../reducers/searchReducer";
const NavBarAdminDashbord = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav-bar-admin flex">
      <RegisterHeader className="register-head1 navbar-img-admin" />
      <label className="nav-bar-label-admin register-head2">User</label>
      <input
        type="text"
        name="username"
        className="register-head1 navbar-input-admin"
        onChange={(e) => {
          dispatch(setSearch(e.target.value));
        }}
      />
      <Logout className="logout-dash" />
    </div>
  );
};
export default NavBarAdminDashbord;
