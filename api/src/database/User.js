const userSchema = require('./schema/userSchema');
const User = require('./schema/userSchema');
// traer los datos de todos los usuarios
const getAllUsers = async () => {
    try {
        const allUsers = await userSchema.find();
        return allUsers;
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        throw error;
    }
};
// mostrar un usuario
const getOneUser = async (userId) => {
    try {
        const user = await userSchema.findById(userId);
        return user;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};
// crear un usuario
const createNewUser = async (newUser) => {
    try {
        const user = await userSchema.create(newUser);
        return user;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};
/*
const createNewUser = async(newUser) => {
    const isAlreadyAdded = await userSchema.findOne({
        username: newUser.username,
    });
    if (isAlreadyAdded) {
        return;
    }
    const user = userSchema.create(newUser);
    return user;
};
*/

/*
const createNewUser = async (newUser) => {
    const isAlreadyAdded = userSchema.findOne({
        username: newUser.username,
    });
    if (isAlreadyAdded) {
        return;
    }
    const user =  userSchema.create(newUser);
    console.log(user);
    return user;
};
*/
// actualizar un usuario
const updateOneUser = async (userId, body) => {
    const updatedUser = await userSchema.findByIdAndUpdate(
        userId,
        body,
        { new: true }
    );
    return updatedUser;
};

// borrar un usuario
const deleteOneUser = async (userId) => {
    const deletedUser = await userSchema.findByIdAndDelete(userId);
    return deletedUser;
};
module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};