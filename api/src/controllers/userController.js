const userService = require('../services/userService');

// mostrar todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        console.log('Datos obtenidos:', allUsers);
        res.send({ status: 'OK', data: allUsers });
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}; 
// mostrar un usuario
const getOneUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await userService.getOneUser(userId);
        console.log('Datos obtenidos:', user);
        res.send({ status: 'OK', data: user });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};
// crear un usuario
const createNewUser = async (req, res) => {
    const body = req.body;
    if (
        !body.username ||
        !body.rut ||
        !body.password ||
        !body.email ||
        !body.role
    ) {
        return;
    }
    const newUser = {
        username: body.username,
        rut: body.rut,
        password: body.password,
        email: body.email,
        role: body.role,
    };
    try {
        const createdUser = await userService.createNewUser(newUser);
        console.log('Usuario creado:', createdUser);
        res.status(201).send({status: 'OK', data: createdUser});
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};
// actualizar un usuario
const updateOneUser = async (req, res) => {
    const {body, params: {userId}} = req;
    if (!userId) {
        console.error('id de usuario no encontrado');
        return res.status(400).send({ status: 'Error', message: 'id de usuario no encontrado' });
    }
    try {
        console.log('Actualizando usuario con id:', userId);
        const updatedUser = await userService.updateOneUser(userId, body);
        console.log('Usuario actualizado:', updatedUser);
        res.send({status: 'OK', data: updatedUser});
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};
// borrar un usuario
const deleteOneUser = async (req, res) => {
    const {
        params: { userId },
    } = req;

    if (!userId) {
        console.error('Error al eliminar usuario: Falta el ID del usuario');
        res.status(400).send({ status: 'Error', message: 'Falta el ID del usuario' });
        return;
    }

    try {
        await userService.deleteOneUser(userId);
        console.log(`Usuario con ID ${userId} eliminado exitosamente`);
        res.status(204).send({ status: 'OK', message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};

const authenticate = async (req, res) => {
    const { body } = req;
    if (!body.email || 
        !body.password
        ) {
        return;
    }
    const user = {
        email: body.email,
        password: body.password,
    };

    try {
        const authenticatedUser = await userService.authenticate(user);
        console.log('Usuario autenticado:', authenticatedUser);
        res.status(201).send({status: 'OK', data: authenticatedUser});
    } catch (error) {
        console.error('Error al autenticar el usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
}



module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
    authenticate,
};