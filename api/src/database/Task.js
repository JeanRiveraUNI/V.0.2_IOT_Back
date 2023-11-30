const DB = require('./db/db_Prueba.json');
const { saveToDatabasePrueba } = require('./utils');

const getAllTasks = () => {
    return DB.Universidad; 
};
module.exports = {
    getAllTasks,
};