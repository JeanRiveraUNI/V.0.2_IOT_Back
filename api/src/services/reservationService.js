const Reservation = require('../database/schema/reservation');

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getAllReservations() {
    return await Reservation.find();
}

const createReservation = async (newReservation) => {
    const reservationToInsert = {
        email: newReservation.email,
        location: newReservation.location,
        reservation: newReservation.reservation,
    };
    const createdReservation = await Reservation.create(reservationToInsert);
    return createdReservation;
}

/*
async function createReservation(reservationData) {
    const reservation = new Reservation(reservationData);
    return await reservation.save(); 
}
*/

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getReservationById(reservationId) {
    return await Reservation.findById(reservationId);
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function updateReservationById(reservationId, newData) {
    return await Reservation.findByIdAndUpdate(reservationId, newData, { new: true });
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function deleteReservationById(reservationId) {
    return await Reservation.findByIdAndDelete(reservationId);
}

module.exports = {
    getAllReservations,
    createReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById
};
