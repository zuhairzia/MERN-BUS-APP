import React, { useState } from "react";
import * as signupFunc from "./SignupFunctions";
import { FaBus, FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import "./logOrsign.css";

export default function Signup({ history }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupFunc.registerUser(newUser);
      console.log("User registered:", res.data);
      history.push("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to register. Please try again.");
    }
  };

  const getToLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        {/* Left Section */}
        <div className="login-left">
          <FaBus className="login-icon" />
          <h1>Musafir</h1>
          <p>Smart Bus Ticket Booking System</p>
          <h3 className="lead-text mn-txt">Join Us with Social</h3>
          <div className="social-icons">
            <FaFacebookF className="icon-soc" />
            <FaTwitterSquare className="icon-soc" />
          </div>
        </div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Create Account</h2>
          <p className="sub-text">Fill in the details to get started</p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="text"
                name="name"
                value={newUser.name}
                required
                onChange={handleChange}
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={newUser.email}
                required
                onChange={handleChange}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="mobile"
                value={newUser.mobile}
                required
                onChange={handleChange}
              />
              <label>Mobile Number</label>
            </div>

            <div className="gender-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={newUser.gender === "Male"}
                  onChange={handleChange}
                  required
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={newUser.gender === "Female"}
                  onChange={handleChange}
                  required
                />{" "}
                Female
              </label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={newUser.password}
                required
                onChange={handleChange}
              />
              <label>Password</label>
            </div>

            <button type="submit" className="login-btn">
              Sign Up
            </button>

            <p className="signup-link">
              Already have an account?{" "}
              <span onClick={getToLogin} className="login-span">
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}