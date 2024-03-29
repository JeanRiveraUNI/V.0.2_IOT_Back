const reservationService = require('../services/reservationService');

// esta funcion se encarga de llamar al servicio
// para obtener todos los reservations
// y luego enviar la respuesta
async function getAllReservations(req, res) {
    try {
        const reservations = await reservationService.getAllReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

const createReservation = async (req, res) => {
    const body = req.body;
    if (
        !body.email ||
        !body.location ||
        !body.reservation 
    ) {
        return;
    }
    const newReservation = {
        email: body.email,
        location: body.location,
        reservation: body.reservation,
    };
    try {
        const createdReservation = await reservationService.createReservation(newReservation);
        console.log('Reserva creada:', createdReservation);
        res.status(201).send({status: 'OK', data: createdReservation});
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}


/*
async function createReservation(req, res) {
    const reservationData = req.body;
    try {
        const reservation = await reservationService.createReservation(reservationData);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}
*/
// esta funcion se encarga de llamar al servicio
// para obtener un reservation por su id
// y luego enviar la respuesta
async function getReservationById(req, res) {
    const { reservationId } = req.params;
    try {
        const reservation = await reservationService.getReservationById(reservationId);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// esta funcion se encarga de llamar al servicio
// para actualizar un reservation por su id
// y luego enviar la respuesta
async function updateReservationById(req, res) {
    const { reservationId } = req.params;
    const reservationData = req.body;
    try {
        const reservation = await reservationService.updateReservationById(reservationId, reservationData);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// esta funcion se encarga de llamar al servicio
// para eliminar un reservation por su id
// y luego enviar la respuesta
async function deleteReservationById(req, res) {
    const { reservationId } = req.params;
    try {
        const reservation = await reservationService.deleteReservationById(reservationId);
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// funciones segun necesidad

module.exports = {
    getAllReservations,
    createReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById
};
