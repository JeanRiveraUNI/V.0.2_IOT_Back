const Parking = require('../database/schema/parking');

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function getAllParkings() {
    return await Parking.find();
}

// esta funcion es la que se llama desde el controlador
// y es la que se exporta
async function createParking(parkingData) {
    const parking = new Parking(parkingData);
    return await parking.save(); 
}

// funciones segun necesidad

module.exports = {
    getAllParkings,
    createParking,
};
