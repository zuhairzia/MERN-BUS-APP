import React, { useState } from "react";
import "./Routeselector.css";
import * as apiCall from "./routeApifunc";
import BusList from "../BusList/BusList";

export default function Routeselector() {
  const [buses, setBuses] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      alert("Please select From, To and Date");
      return;
    }

    if (from === to) {
      alert("From and To cannot be same");
      return;
    }

    localStorage.setItem("start", from);
    localStorage.setItem("destination", to);
    localStorage.setItem("date", date);

    try {
      const response = await apiCall.getRoutesFromApi(from, to);
      setBuses(response.data.bus || []);
    } catch (error) {
      console.error("Error fetching routes", error);
    }
  };

  return (
    <div className="rdc ai-bg">
      <div className="route-card glass-card">

        <h2 className="title">Search Bus Routes</h2>

        <form className="route-form" onSubmit={handleSearch}>

          <select
            className="route-select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">From</option>
            <option value="Lahore">Lahore</option>
            <option value="Sadiqabad">Sadiqabad</option>
          </select>

          <select
            className="route-select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">To</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="RaheemYarKhan">RaheemYarKhan</option>
            <option value="Multan">Multan</option>
          </select>

          <input
            type="date"
            className="route-date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit" className="btn-search">
            Search Buses
          </button>

        </form>

        {buses.length > 0 && <BusList value={buses} />}

      </div>
    </div>
  );
}