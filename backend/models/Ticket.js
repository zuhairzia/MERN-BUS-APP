const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  companyName: { type: String },
  startCity: { type: String },
  destination: { type: String },
  username: { type: String },
  userId: { type: String },
  date: { type: Date },
  passengers: { type: Number },
  passengerNames: { type: [String], default: [] },
  seatNumbers: { type: [String], default: [] },
  seatPrice: { type: Number },
  tax: { type: Number },
  total: { type: Number },
  txnId: { type: String },
  paymentMethod: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Tickets' });

module.exports = mongoose.model('Ticket', TicketSchema);