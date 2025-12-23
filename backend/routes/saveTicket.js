const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    // Basic normalization: ensure arrays exist
    payload.passengerNames = payload.passengerNames || [];
    payload.seatNumbers = payload.seatNumbers || [];

    const ticket = new Ticket(payload);
    await ticket.save();

    res.status(201).json({ success: true, ticket });
  } catch (err) {
    console.error('Save ticket error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
