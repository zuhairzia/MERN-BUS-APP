import React, { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import "./Tab.css";

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({});
  const [arrowDown, setArrowDown] = useState(false);

  const reservedSeats = [
    "1A","2A","2B","3B","4A","5C",
    "6A","7B","7C","8B","9B","9C"
  ];

  const handleSeatChange = (seat) => {
    if (reservedSeats.includes(seat)) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handlePassengerChange = (seat, field, value) => {
    setPassengers((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    setArrowDown(true);
    localStorage.setItem("reservedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem(
      "nameData",
      JSON.stringify(
        selectedSeats.map(seat => passengers[seat]?.name)
      )
    );
  };

  return (
    <div className="ss ai-bg">
      <div className="row">

        {/* SEAT LAYOUT */}
        <div className="column1">
          <div className="plane glass-card">
            <h3 className="text-center">Select Your Seats</h3>

            <div className="seat-grid">
              {["A","B","C"].map(col =>
                Array.from({ length: 10 }, (_, i) => {
                  const seat = `${i + 1}${col}`;
                  const disabled = reservedSeats.includes(seat);
                  const active = selectedSeats.includes(seat);

                  return (
                    <button
                      key={seat}
                      className={`seat-btn 
                        ${disabled ? "seat-disabled" : ""} 
                        ${active ? "seat-active" : ""}`}
                      onClick={() => handleSeatChange(seat)}
                      disabled={disabled}
                    >
                      {seat}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* PASSENGER INFO */}
        <div className="column2">
          <div className="seatInfo glass-card">
            <h3 className="text-center">Passenger Details</h3>

            {selectedSeats.map((seat) => (
              <div key={seat} className="passenger-card">
                <p>Seat: <strong>{seat}</strong></p>

                <input
                  type="text"
                  placeholder="Passenger Name"
                  onChange={(e) =>
                    handlePassengerChange(seat, "name", e.target.value)
                  }
                />

                <div className="gender-group">
                  <label>
                    <input
                      type="radio"
                      name={`gender-${seat}`}
                      onChange={() =>
                        handlePassengerChange(seat, "gender", "Male")
                      }
                    />
                    Male
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`gender-${seat}`}
                      onChange={() =>
                        handlePassengerChange(seat, "gender", "Female")
                      }
                    />
                    Female
                  </label>
                </div>
              </div>
            ))}

            {selectedSeats.length > 0 && (
              <button className="btn-confirm" onClick={handleSubmit}>
                Confirm Details
              </button>
            )}

            <div className={arrowDown ? "activeArrow2" : "nonActive"}>
              <FaAngleDoubleDown />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}