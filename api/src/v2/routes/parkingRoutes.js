const express = require('express');
const router = express.Router();
const parkingController = require('../../controllers/parkingController');


router.get('/', parkingController.getAllParkings);
router.post('/', parkingController.createParking);
// aqui van las rutas segun necesidad

module.exports = router;
