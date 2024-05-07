import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import "./LoginCard.css";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/UserReducer";

import axios from "axios";
function LoginCard() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("All fields must be filled out");
      return;
    }
    const data = new FormData();
    data.append("action", "login");
    data.append("email", email);
    data.append("password", password);
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost/Server/api.php",
        data
      );
      console.log(response);
      if (response.status === 200) {
        if (response.data.message == "Incorrect password") {
          alert("Incorrect password");
        } else if (response.data.message == "User not found") {
          alert("User not found");
        } else if (response.data.message == "Failed to login") {
          alert("Failed to login");
        } else {
          console.log("User logged in successfully");
          console.log(response);
          localStorage.setItem("userId", response.data.id);
          localStorage.setItem("buttonOn", 0);
          localStorage.setItem("admin", response.data.is_admin);
          dispatch(setUser(response.data.id));
          // ReactSession.setStoreType("localStorage");
          //ReactSession.set("id", response.data.id);

          if (response.data.is_admin == 1) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/frontpage";
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert("Invalid email or password");
      }
    }
  };
  return (
    <div className="LoginCard">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Embark on an expedition </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <button type="submit" id="LoginButton" className="btn btn-primary">
              Login
            </button>
            <p className="login-link">
              Don't have an account ? <a href="/">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LoginCard;
