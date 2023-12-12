const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservationController');

router.get('/', reservationController.getAllReservations);
router.post('/', reservationController.createReservation);
// aqui van las rutas segun necesidad

module.exports = router;

