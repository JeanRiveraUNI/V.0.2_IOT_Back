const fs = require('fs');
const userSchema = require('./schema/userSchema');
const { request } = require('http');
//-------------------------------------------------------------------------
//base de datos json
//local
const saveToDatabase = (DB) => {
    fs.writeFileSync('./src/database/db/db.json', JSON.stringify(DB, null, 2),
    { 
        encoding : 'utf-8',
    });
};
//-------------------------------------------------------------------------
//base de pruebas json
//local
const saveToDatabasePrueba = (DB) => {
    fs.writeFileSync('./src/database/db/db_Prueba.json', JSON.stringify(DB, null, 2),
    { 
        encoding : 'utf-8',
    });
};
//-------------------------------------------------------------------------
//base de datos MongoDB 
//Atlas
/*
const saveToDatabaseUser = (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
};
*/

const saveToDatabaseUser = async (req) => {
    const saveuser = await userSchema.create(req.body);
    return saveuser;
};


//-------------------------------------------------------------------------
module.exports = {
    saveToDatabase,
    saveToDatabasePrueba,
    saveToDatabaseUser,
};
//-------------------------------------------------------------------------