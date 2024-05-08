import React from "react";
import "./NavBar.css";
import RegisterHeader from "../ComponentsRegister/RegisterHeader";
import { useDispatch } from "react-redux";
import { setFrom, setTo, setDate } from "../reducers/filtersReducer";
import Logout from "./Logout";
const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <div className="nav-bar">
      <RegisterHeader className="mt-1 navbar-img" />
      <div className="navbar-div">
        <div className="navbar-div">
          <label className="nav-bar-label mt-1">From</label>
          <input
            type="text"
            id="fromCity"
            name="fromCity"
            placeholder="City"
            className="mt-1 navbar-input"
            onChange={(e) => {
              dispatch(setFrom(e.target.value));
              console.log(e.target.value);
            }}
          />
        </div>
        <div className="navbar-div">
          <label className="nav-bar-label mt-1">To</label>
          <input
            type="text"
            id="toCity"
            name="toCity"
            placeholder="City"
            className="mt-1 navbar-input"
            onChange={(e) => dispatch(setTo(e.target.value))}
          />
        </div>
      </div>
      <div className="navbar-div">
        <label className="nav-bar-label mt-2">On</label>
        <input
          type="date"
          id="date"
          name="date"
          className="mt-1 navbar-input"
          onChange={(e) => dispatch(setDate(e.target.value))}
        />
      </div>
      <Logout />
    </div>
  );
};

export default NavBar;
