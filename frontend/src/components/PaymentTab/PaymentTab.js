import React from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import jwt_decode from 'jwt-decode';
import './PaymentTab.css';

/* ===== Row Style for Booking Details ===== */
const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '6px 0',
  borderBottom: '1px solid rgba(255,255,255,0.2)'
};

export default class PaymentTab extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    token: null
  };

  componentDidMount() {
    const tok = sessionStorage.getItem('authToken');
    if (tok) {
      const decoded = jwt_decode(tok);
      this.setState({ token: decoded.user });
    }
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) this.setState({ issuer });
  };

  handleInputFocus = ({ target }) => {
    this.setState({ focused: target.name });
  };

  /* ===== CARD INPUT RESTRICTIONS ===== */
  handleInputChange = ({ target }) => {
    let value = target.value;

    switch (target.name) {
      case 'number':
        // only numbers, max 16 digits, auto space
        value = value.replace(/\D/g, '').slice(0, 16);
        value = value.replace(/(.{4})/g, '$1 ').trim();
        break;

      case 'expiry':
        // MM/YY format
        value = value.replace(/\D/g, '').slice(0, 4);
        if (value.length > 2) {
          value = value.slice(0, 2) + '/' + value.slice(2);
        }
        break;

      case 'cvc':
        // only numbers, max 4 digits
        value = value.replace(/\D/g, '').slice(0, 4);
        break;

      case 'name':
        // letters & spaces only
        value = value.replace(/[^a-zA-Z ]/g, '');
        break;

      default:
        break;
    }

    this.setState({ [target.name]: value });
  };

  moveToTicketPage = (e) => {
    e.preventDefault();
    // Save payment token locally for ticket page
    localStorage.setItem('paymentData', JSON.stringify(this.state.token));

    // Build ticket payload from localStorage and auth
    const seatsData = localStorage.getItem('reservedSeats');
    let seats = [];
    try {
      seats = seatsData ? JSON.parse(seatsData) : [];
    } catch {
      seats = [];
    }

    const passengerData = localStorage.getItem('nameData');
    let passengers = [];
    try {
      passengers = passengerData ? JSON.parse(passengerData) : [];
    } catch {
      passengers = [];
    }

    const seatPrice = 1000;
    const tax = 150;
    const total = seats.length * seatPrice + tax;

    const payload = {
      companyName: localStorage.getItem('companyName') || 'Musafir',
      startCity: localStorage.getItem('start') || '',
      destination: localStorage.getItem('destination') || '',
      username: localStorage.getItem('userEmail') || '',
      date: localStorage.getItem('date') || null,
      passengers: passengers.length || 1,
      passengerNames: passengers,
      seatNumbers: seats,
      seatPrice,
      tax,
      total,
      txnId: `TXN${Date.now()}`,
      paymentMethod: 'Card'
    };

    // POST to backend to save ticket, then redirect to ticket page
    const token = sessionStorage.getItem('authToken');

    fetch('http://localhost:8080/ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.ticket) {
          localStorage.setItem('savedTicketId', data.ticket._id);
        } else {
          console.warn('Ticket save failed or returned unexpected data', data);
        }
        window.location.href = '/getTicket';
      })
      .catch((err) => {
        console.error('Error saving ticket:', err);
        // redirect anyway so user sees their ticket (or error handling can be improved)
        window.location.href = '/getTicket';
      });
  };

  renderNamesOfPassenger = () => {
    const data = localStorage.getItem('nameData');
    if (!data) return '-';
    try {
      return JSON.parse(data).join(', ');
    } catch {
      return '-';
    }
  };

  renderSeatNumbers = () => {
    const data = localStorage.getItem('reservedSeats');
    if (!data) return '-';
    try {
      return JSON.parse(data).join(', ');
    } catch {
      return '-';
    }
  };

  getSumTotal = () => {
    const data = localStorage.getItem('reservedSeats');
    if (!data) return null;

    let seats = [];
    try {
      seats = JSON.parse(data);
    } catch {
      return null;
    }

    const seatPrice = 1000;
    const tax = 150;
    const total = seats.length * seatPrice + tax;

    return (
      <div style={{ marginTop: '10px' }}>
        <div style={rowStyle}>
          <span>Seat Price</span>
          <span> {seats.length * seatPrice}</span>
        </div>
        <div style={rowStyle}>
          <span>Tax</span>
          <span> {tax}</span>
        </div>
        <div style={{ ...rowStyle, fontWeight: 'bold' }}>
          <span>Total</span>
          <span> {total} RS </span>
        </div>
      </div>
    );
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state;

    return (
      <div
        className="payment-container"
        style={{
          background: 'linear-gradient(to right, #4b6cb7, #182848)',
          minHeight: '100vh',
          padding: '40px 20px',
          color: '#fff'
        }}
      >
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

          {/* ===== PAYMENT FORM ===== */}
          <div
            style={{
              flex: '1 1 400px',
              background: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '15px'
            }}
          >
            <h2 style={{ textAlign: 'center' }}>Enter Card Details</h2>

            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />

            <form style={{ marginTop: '20px', display: 'grid', gap: '12px' }}>
              <input
                name="number"
                placeholder="Card Number"
                inputMode="numeric"
                maxLength={19}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <input
                name="name"
                placeholder="Name on Card"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <input
                name="expiry"
                placeholder="MM/YY"
                inputMode="numeric"
                maxLength={5}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <input
                name="cvc"
                placeholder="CVC"
                inputMode="numeric"
                maxLength={4}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <input type="hidden" name="issuer" value={issuer} />

              <button
                onClick={this.moveToTicketPage}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: '#f39c12',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: 'none'
                }}
              >
                PAY NOW
              </button>
            </form>
          </div>

          {/* ===== BOOKING DETAILS ===== */}
          <div
            style={{
              flex: '1 1 400px',
              background: 'rgba(255,255,255,0.1)',
              padding: '20px',
              borderRadius: '15px'
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
              Booking Details
            </h2>

            <div style={rowStyle}>
              <span>Date</span>
              <span>{localStorage.getItem('date')}</span>
            </div>

            <div style={rowStyle}>
              <span>From</span>
              <span>{localStorage.getItem('start')}</span>
            </div>

            <div style={rowStyle}>
              <span>To</span>
              <span>{localStorage.getItem('destination')}</span>
            </div>

            <div style={rowStyle}>
              <span>Passengers</span>
              <span>{this.renderNamesOfPassenger()}</span>
            </div>

            <div style={rowStyle}>
              <span>Seat No</span>
              <span>{this.renderSeatNumbers()}</span>
            </div>

            {this.getSumTotal()}
          </div>

        </div>
      </div>
    );
  }
}