const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BusSchema = new Schema({
    companyName: {
        type: String
    },
    busType: {
        type: String
    },
    busNumber: {
        type: String
    },
    startCity: {
        type: String
    },
    destination: {
        type: String
    },
    totalSeats: {
        type: String
    },
    availableSeats: {
        type: String
    },
    pricePerSeat: {
        type: String
    }
}, {collection: "Buses"})

const bus = mongoose.model('Bus', BusSchema)

module.exports = bus;