const mongoose = require('mongoose');
const { saveToDatabaseUser } = require('./utils');
const userSchema = require('./userSchema');

//
const createNewUser = (newUser) => {
    const isAlreadyAdded =
        userSchema.findIndex((user) => user.username === newUser.username) > -1;
    if (isAlreadyAdded) {
        return;
    }
    userSchema.push(newUser);
    saveToDatabaseUser(userSchema);
    return newUser;
};
module.exports = {
    createNewUser,
};



