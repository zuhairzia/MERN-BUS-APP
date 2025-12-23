const express = require('express');
const router = express.Router();
const Bus = require('../models/Buses'); // file name exact

// Add new bus
router.post('/add', async (req, res) => {
    try {
        const newBus = new Bus(req.body); // frontend se data aayega body me
        const savedBus = await newBus.save();
        res.status(201).json(savedBus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save bus' });
    }
});

// Get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch buses' });
    }
});

module.exports = router;