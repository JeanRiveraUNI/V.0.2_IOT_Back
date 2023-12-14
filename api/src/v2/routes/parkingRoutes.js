const express = require('express');
const router = express.Router();
const parkingController = require('../../controllers/parkingController');


router.get('/', parkingController.getAllParkings);
router.post('/', parkingController.createParking);
router.get('/:parkingId', parkingController.getParkingById);
router.put('/:parkingId', parkingController.updateParkingById);
router.delete('/:parkingId', parkingController.deleteParkingById);

//----------------------------------------------------------------
router.get('/estacionamiento/disponibles', parkingController.estacionamientoDisponibles);

module.exports = router;
