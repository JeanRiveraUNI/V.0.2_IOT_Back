const User = require('../database/User');

// mostrar todos los usuarios
const getAllUsers = async () => {
    const allUsers = await User.getAllUsers();
    return allUsers;
    
    /*
    try {

        const allUsers = User.getAllUsers();
        return allUsers;
    }
    catch (error) {
        console.error('Error al serializar datos a JSON:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
    */
};

// mostrar un usuario
const getOneUser = (userId) => {
    const user = User.getOneUser(userId); // Corregir: Debe ser getOneUser en lugar de getAllUsers
    return user;
};

// crear un usuario
const createNewUser = (newUser) => {
    const userToInsert = {
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        role: newUser.role,
    };
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
};

// actualizar un usuario
const updateOneUser = (userId, body) => {
    const updatedUser = User.updateOneUser(userId, body);
    return updatedUser;
};

// borrar un usuario
const deleteOneUser = (userId) => {
    return User.deleteOneUser(userId);
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
//--------------------------------------------------------------
/*
const createNewUser = (newUser) => {
    const user = new User(newUser);
    user.save();
    return user;
};
*/