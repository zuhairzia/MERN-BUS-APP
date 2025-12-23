import React from 'react';
import './TicketPage.css';

export default function TicketPage({ history }) {

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    localStorage.clear();
    history.push('/');
  };

  const handleBookAgain = (e) => {
    e.preventDefault();
    history.push('/routes');
  };

  // ===== GET DATA =====
  const username = localStorage.getItem("username") || "Zuhair";
  const date = localStorage.getItem("date") || "2025-12-01";
  const from = localStorage.getItem("start") || "Lahore";
  const to = localStorage.getItem("destination") || "Sadiqabad";

  const passengerNames = JSON.parse(localStorage.getItem("nameData") || "[]");
  const seats = JSON.parse(localStorage.getItem("reservedSeats") || "[]");
  const seatNo = seats.join(", ");

  const seatPrice = 1000;
  const tax = 150;
  const total = seatPrice + tax;

  const transactionId = localStorage.getItem("selectedBusId") || "TXN123456";

  // ===== REUSABLE ROW =====
  const DetailRow = ({ label, value }) => (
    <div className="detail-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );

  return (
    <div className="container">
      <nav className="navbar">
  <div className="navbar-left">
    <span className="navbar-brand">🚌 Musafir</span>
  </div>

  <div className="nav-links">
    <button onClick={handleBookAgain} className="nav-btn primary">
      Book Again
    </button>
    <button onClick={handleSignOut} className="nav-btn danger">
      Sign Out
    </button>
  </div>
</nav>


      {/* Ticket */}
      <div className="tpMain">
        <article className="ticket-cinema">

          {/* Header */}
          <div className="ticket-header">
            <h3>🎟 Musafir</h3>
            <span className="ticket-badge">CONFIRMED</span>
          </div>

          {/* Route */}
          <div className="route-box">
            <div>
              <div className="label">From</div>
              <div className="route-line">{from}</div>
            </div>
            <div>➡</div>
            <div>
              <div className="label">To</div>
              <div className="route-line">{to}</div>
            </div>
          </div>

          {/* Details */}
          <div className="details-grid">
            <DetailRow label="Username" value={username} />
            <DetailRow label="Date" value={date} />
            <DetailRow label="Passengers" value={passengerNames.length} />
            <DetailRow label="Seat No" value={seatNo} />
          </div>

          {/* Price */}
          <div className="price-box">
            <p><span>Seat Price</span><span> {seatPrice}</span></p>
            <p><span>Tax</span><span> {tax}</span></p>
            <p className="total"><span>Total</span><span>{total} RS </span></p>
          </div>

          {/* Footer */}
          <div className="ticket-footer">
            <span>Txn ID: {transactionId}</span>
            <span>💳 Credit Card</span>
          </div>

        </article>
      </div>
    </div>
  );
}