const Parking = require('../database/schema/parking');

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getAllParkings() {
    return await Parking.find();
}
// lista de estacionamientos disponibles
const estacionamientoDisponible = async () => {
    const listaDisponibles = Parking.find(
        parking.location,
        parking.available,
    );
    return listaDisponibles;
};
// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function createParking(parkingData) {
    const parking = new Parking(parkingData);
    return await parking.save(); 
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getParkingById(parkingId) {
    return await Parking.findById(parkingId);
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta

async function updateParkingById(parkingId, newData) {
    return await Parking.findByIdAndUpdate(parkingId, newData, { new: true });
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function deleteParkingById(parkingId) {
    return await Parking.findByIdAndDelete(parkingId);
}

module.exports = {
    getAllParkings,
    createParking,
    getParkingById,
    updateParkingById,
    deleteParkingById,
    estacionamientoDisponible,
};

