const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservationController');

router.get('/', reservationController.getAllReservations);
router.post('/', reservationController.createReservation);
router.get('/:reservationId', reservationController.getReservationById);
router.put('/:reservationId', reservationController.updateReservationById);
router.delete('/:reservationId', reservationController.deleteReservationById);

module.exports = router;

