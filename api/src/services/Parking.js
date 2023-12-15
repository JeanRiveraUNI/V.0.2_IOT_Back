const reservation = require('../database/schema/reservation');

const createdReservation = async (newReservation) => {
    try {
        const reservation = await reservation.create(newReservation);
        return reservation;
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        throw error;
    }
}

module.exports = {
    createdReservation
};