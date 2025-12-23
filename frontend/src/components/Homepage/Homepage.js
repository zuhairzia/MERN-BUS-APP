import React from "react";
import { withRouter } from "react-router-dom";
import "./homepage.css";

function Homepage({ history }) {
  return (
    <div className="hero">
      <div className="overlay">
        <nav className="nav">
          <h2>🚌 Musafir</h2>
        </nav>

        <div className="hero-content">
          <h1>
            Your Journey <span>Begins</span> Here
          </h1>
          <p>Smart booking • Safe travel • Comfortable ride</p>

          <button className="cta-btn" onClick={() => history.push("/login")}>
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Homepage);
