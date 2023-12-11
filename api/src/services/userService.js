const User = require('../database/User');

// mostrar todos los usuarios
const getAllUsers = () => {
    const allUsers = User.getAllUsers();
    return allUsers;
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
        rut: newUser.rut,
        password: newUser.password,
        email: newUser.email,
        role: newUser.role,
    };
    const createdUser = User.createNewUser(userToInsert);
    return createdUser;
};
// actualizar un usuario
const updateOneUser = async (userId, body) => {
    try {
        const existingUser = await User.getOneUser(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        // se actualizan los campos que llegan en el body
        if (body.username) {
            existingUser.username = body.username;
        }
        if (body.password) {
            existingUser.password = body.password;
        }
        if (body.email) {
            existingUser.email = body.email;
        }
        if (body.role) {
            existingUser.role = body.role;
        }
        existingUser.lastUpdate_at = Date.now();
        const updatedUser = await existingUser.save();
        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};

// borrar un usuario
const deleteOneUser = (userId) => {
    return User.deleteOneUser(userId);
};

// autenticar un usuario
const authenticate = (username, password) => {
    return User.authenticate(username, password);
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    authenticate,
};
//--------------------------------------------------------------
/*
const createNewUser = (newUser) => {
    const user = new User(newUser);
    user.save();
    return user;
};
*/