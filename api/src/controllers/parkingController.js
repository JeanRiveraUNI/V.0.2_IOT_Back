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
// esta funcion se encarga de llamar al servicio
// para obtener un parking por su id
// y luego enviar la respuesta
async function getParkingById(req, res) {
    const { parkingId } = req.params;
    try {
        const parking = await parkingService.getParkingById(parkingId);
        res.json(parking);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// esta funcion se encarga de llamar al servicio
// para actualizar un parking por su id
// y luego enviar la respuesta
async function updateParkingById(req, res) {
    const { parkingId } = req.params;
    const parkingData = req.body;
    try {
        const parking = await parkingService.updateParkingById(parkingId, parkingData);
        res.json(parking);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

// esta funcion se encarga de llamar al servicio
// para eliminar un parking por su id
// y luego enviar la respuesta
async function deleteParkingById(req, res) {
    const { parkingId } = req.params;
    try {
        const parking = await parkingService.deleteParkingById(parkingId);
        res.json(parking);
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

module.exports = {
    getAllParkings,
    createParking,
    getParkingById,
    updateParkingById,
    deleteParkingById
};

