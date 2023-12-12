const parkingService = require('../services/parkingService');

// esta funcion se encarga de llamar al servicio
// para obtener todos los parkings
// y luego enviar la respuesta
async function getAllParkings(req, res) {
    try {
        const parkings = await parkingService.getAllParkings();
        res.json(parkings);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// esta funcion se encarga de llamar al servicio
// para crear un nuevo parking
// y luego enviar la respuesta
async function createParking(req, res) {
    const parkingData = req.body;
    try {
        const parking = await parkingService.createParking(parkingData);
        res.status(201).json(parking);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// funciones segun necesidad

module.exports = {
    getAllParkings,
    createParking,
};

