const Reservation = require('../database/schema/reservation');

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getAllReservations() {
    return await Reservation.find();
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function createReservation(reservationData) {
    const reservation = new Reservation(reservationData);
    return await reservation.save(); 
}

// funciones segun necesidad

module.exports = {
    getAllReservations,
    createReservation,
};
