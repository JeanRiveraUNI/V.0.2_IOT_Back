const fs = require('fs');
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
//-------------------------------------------------------------------------
//base de datos json
//local
const saveToDatabase = (DB) => {
    fs.writeFileSync('./src/database/db.json', JSON.stringify(DB, null, 2),
    { 
        encoding : 'utf-8',
    });
};
//-------------------------------------------------------------------------
//base de pruebas json
//local
const saveToDatabasePrueba = (DB) => {
    fs.writeFileSync('./src/database/db_Prueba.json', JSON.stringify(DB, null, 2),
    { 
        encoding : 'utf-8',
    });
};
//-------------------------------------------------------------------------
//base de datos MongoDB 
//Atlas
const saveToDatabaseUser = (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};
//-------------------------------------------------------------------------
module.exports = {
    saveToDatabase,
    saveToDatabasePrueba,
    saveToDatabaseUser,
};
//-------------------------------------------------------------------------