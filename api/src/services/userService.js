const User = require('../database/schema/userSchema');

const createNewUser = (newUser) => {
    const user = new User(newUser);
    user.save();
    return user;
};

module.exports = {
    createNewUser,
};