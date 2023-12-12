const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        require: true,
    },
    capacity: {
        type: Number,
        require: true,
    },
    available: {
        type: Number,
        require: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null },
    });

    const Parking = mongoose.model('Parking', parkingSchema);
    module.exports = Parking;
