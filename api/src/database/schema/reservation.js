const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'email',
        required: true 
    },
    parking: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'location', 
        required: true 
    },
    reservation: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        default: null,
    },
    endTime: {
        type: Date,
        default: null},
    });

    const Reservation = mongoose.model('Reservation', reservationSchema);
    module.exports = Reservation;
    

