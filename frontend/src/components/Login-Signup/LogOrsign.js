import React, { useState } from "react";
import * as logFunc from "./loginFunctions.js";
import "./logOrsign.css";
import { FaBus } from "react-icons/fa";

export default function LogOrsign({ history }) {
  const [userData, setUserData] = useState({});

  const getToSignUp = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleChangeEvent = (e, title) => {
    setUserData({ ...userData, [title]: e.target.value });
  };

  const submitData = (e) => {
    e.preventDefault();
    logFunc
      .logUserIn(userData)
      .then((response) => response.data)
      .then((data) => {
        sessionStorage.setItem("authToken", data.token);
        localStorage.setItem("userEmail", userData.email);
        history.push("/routes");
      });
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        
        {/* Left Section */}
        <div className="login-left">
          <FaBus className="login-icon" />
          <h1>Musafir</h1>
          <p>Smart Bus Ticket Booking System</p>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Welcome Back</h2>
          <p className="sub-text">Login to continue your journey</p>

          <form onSubmit={submitData}>
            <div className="input-group">
              <input
                type="email"
                required
                onChange={(e) => handleChangeEvent(e, "email")}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                required
                onChange={(e) => handleChangeEvent(e, "password")}
              />
              <label>Password</label>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <p className="signup-link">
              Don’t have an account?
              <span onClick={getToSignUp}> Sign Up</span>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}