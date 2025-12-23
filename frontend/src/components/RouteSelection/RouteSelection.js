import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import RouteSelector from "../routeSelector/Routeselector";
import SeatSelection from "../SeatSelection/SeatSelection";
import PaymentTab from "../PaymentTab/PaymentTab";
import "./RouteSelection.css";

function RouteSelection({ history }) {
  const [step, setStep] = useState(1);

  const handleSignOut = () => {
    sessionStorage.removeItem("authToken");
    localStorage.clear();
    history.push("/");
  };

  const handleLogoClick = () => {
    history.push("/routes");
  };

  return (
    <div className="route-bg">
      <div className="container">

        {/* NAVBAR */}
        <nav className="ms-navbar">
          <div className="logo" onClick={handleLogoClick}>
            🚌 Musafir
          </div>

          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </nav>

        {/* PROGRESS BAR */}
        <div className="progress-wrapper">
          <div className={`progress-step ${step >= 1 ? "done" : ""}`}>Bus</div>
          <div className={`progress-step ${step >= 2 ? "done" : ""}`}>Seat</div>
          <div className={`progress-step ${step >= 3 ? "done" : ""}`}>Payment</div>

          <div
            className="progress-bar"
            style={{ width: `${(step - 1) * 50}%` }}
          />
        </div>

        {/* CONTENT */}
        <div className="content-card">
          {step === 1 && <RouteSelector />}
          {step === 2 && <SeatSelection />}
          {step === 3 && <PaymentTab />}

          {/* BUTTONS */}
          <div className="step-controls">
            {step > 1 && (
              <button className="back-btn" onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}

            {step < 3 && (
              <button className="next-btn" onClick={() => setStep(step + 1)}>
                Next →
              </button>
            )}

            {step === 3 && (
              <button className="submit-btn">
                Confirm Booking
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default withRouter(RouteSelection);
