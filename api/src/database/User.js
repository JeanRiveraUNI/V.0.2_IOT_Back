const userSchema = require('./schema/userSchema');
// mostrar todos los usuarios
const getAllUsers =  () => {
    const allUsers = userSchema.find().exec(); // Agregar .exec()
    return allUsers;
};
// mostrar un usuario
const getOneUser = async (userId) => {
    const user = await userSchema.findById(userId);
    return user;
};
// crear un usuario
const createNewUser = async (newUser) => {
    const isAlreadyAdded = await userSchema.findOne({
        username: newUser.username,
    });
    if (isAlreadyAdded) {
        return;
    }
    const user = await userSchema.create(newUser);
    console.log(user);
    return user;
};
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