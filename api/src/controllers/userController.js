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
        !body.name ||
        !body.password ||
        !body.email ||
        !body.role
    ) {
        return;
    }
    const newUser = {
        name: body.name,
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
    const {body, params : {userId}}= req;
    if (!userId) {
        return;
    }
    try {
        const updatedUser = await userService.updateOneUser(userId, body);
        console.log('Usuario actualizado:', updatedUser);
        res.send({status: 'OK', data: updatedUser});
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};

/*
const updateOneUser = (req, res) => {
    const {body, params : {userId},
    } = req;
    
    if (!userId) {
        return;
    };

    const updatedUser = userService.updateOneUser(userId, body);
    res.send({status: 'OK', data: updatedUser});
};
*/
// borrar un usuario
const deleteOneUser = (req, res) => {
    const {
        params: {userId},
    } = req;

    if (!userId) {
        return;
    }
    userService.deleteOneUser(userId);
    res.status(204).send({status: 'OK'});
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
/*
// mostrar un usuario
const getOneUser = (req, res) => {
    const {
        params: {userId},
    } = req;

    if (!userId) {
        return;
    }

    const user = userService.getOneUser(userId);
    res.send({status: 'OK', data: user});
};
// crear un usuario
const createNewUser = async () => {
    const {body} = req;
    if (
        body.username ||
        body.password ||
        body.email ||
        body.role
    ) {
        return;
    }
    const newUser = {
        username: body.username,
        password: body.password,
        email: body.email,
        role: body.role,
    };
    const createdUser = await userService.createNewUser(newUser);
    res.status(201).send({status: 'OK', data: createdUser});
};
/*
const createNewUser = (req, res) => {
    const {body} = req;

    if (
        !body.username ||
        !body.password ||
        !body.email ||
        !body.role 
    ) {
        return;
    }

    const newUser = {
        username: body.username,
        password: body.password,
        email: body.email,
        role: body.role,
    };

    console.log(newUser, newUser);

    const createdUser = userService.createNewUser(newUser);

    res.status(201).send({status: 'OK', data: createdUser});
};
const updateOneUser = (req, res) => {
    const {body, params : {userId},
    } = req;
    
    if (!userId) {
        return;
    };

    const updatedUser = userService.updateOneUser(userId, body);
    res.send({status: 'OK', data: updatedUser});
};

const deleteOneUser = (req, res) => {
    const {
        params: {userId},
    } = req;

    if (!userId) {
        return;
    }
    userService.deleteOneUser(userId);
    res.status(204).send({status: 'OK'});
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
*/
