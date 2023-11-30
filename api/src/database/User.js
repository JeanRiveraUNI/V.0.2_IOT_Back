const { saveToDatabaseUser } = require('./utils');
const userSchema = require('./schema/userSchema');

// crear nuevo usuario
//const createNewUser = (newUser) => {
//    const isAlreadyAdded =
  //      userSchema.findIndex((user) => user.username === newUser.username) > -1;
//    if (isAlreadyAdded) {
    //    return;
   // }
   // userSchema.push(newUser);
   // saveToDatabaseUser(userSchema);
   // return newUser;
//};

//module.exports = {
 //   createNewUser,
//};

//-------------------------------------------------------------------------
const mongoose = require('mongoose');
const User = require('./schema/userSchema');

// crear nuevo usuario
const createNewUser = async (newUser) => {
    // Crear una nueva instancia del modelo User
    const user = new User(newUser);

    try {
        // guardar la instancia en la base de datos
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        console.log('Error al guardar el usuario:', error);
    }

};
module.exports = {
    createNewUser,
};

//-------------------------------------------------------------------------
