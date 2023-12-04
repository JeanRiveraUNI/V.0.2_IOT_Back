const userService = require('../services/userService');

// mostrar todos los usuarios
const getAllUsers = (req, res) => {
    const getAllUsers = userService.getAllUsers();
    res.send({status: 'OK', data: getAllUsers});
};
/*
// mostrar todos los usuarios
const getAllUsers = (req, res) => {
    const allUsers = userService.getAllUsers();

    // Intenta convertir a JSON
    try {
        const serializedUsers = JSON.stringify(allUsers);
        console.log('Datos serializados:', serializedUsers);
        res.send({ status: 'OK', data: serializedUsers });
    } catch (error) {
        console.error('Error al serializar datos a JSON:', error);
        res.status(500).send({ status: 'Error', message: 'Error interno del servidor' });
    }
};
*/

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
    const createdUser = userService.createNewUser(newUser);
    res.status(201).send({status: 'OK', data: createdUser});
};
// actualizar un usuario
const updateOneUser = (req, res) => {
    const {body, params : {userId},
    } = req;
    
    if (!userId) {
        return;
    };

    const updatedUser = userService.updateOneUser(userId, body);
    res.send({status: 'OK', data: updatedUser});
};
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
