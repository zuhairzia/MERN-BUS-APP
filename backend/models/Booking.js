const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
console.log("BOOKING ROUTE FILE LOADED");

console.log("BOOKING ROUTE FILE LOADED");

router.post("/", async (req, res) => {
    console.log("BOOKING DATA:", req.body);

    try {
        const booking = new Booking(req.body);
        await booking.save();

        res.status(201).json({
            success: true,
            booking
        });
    } catch (error) {
        console.error("BOOKING ERROR:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;