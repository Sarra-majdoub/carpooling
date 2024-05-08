import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./RegisterCard.css";
import axios from "axios";
import { useEffect } from "react";

function RegisterCard({ image }) {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      alert('All fields must be filled out');
      return;
    }
    

    const data = new FormData();
    data.append("action", "signUp");
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("phoneNumber", phoneNumber);
    data.append("email", email);
    data.append("password", password);
    console.log(image);
    if(image != null){
    data.append("image", image);    }
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost/Server/api.php",
        data
      );
      console.log(response);
      if (response.status === 200) {
        console.log("User registered successfully");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
      return;
    }
  };

  return (
    
    <div className="RegisterCardContainer">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Begin your journey</h5>
          
          <form onSubmit={handleSubmit}>
            <div className="name-group">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
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
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                By signing up, I agree with the Terms of Use & Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              id="RegisterButton"
              className="btn btn-primary"
            >
              Register
            </button>
            <p className="login-link">
              Returning user? <a href="/login">Log in here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default RegisterCard;
