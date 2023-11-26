const userService = require('../services/userService');

const getAllUsers = (req, res) => {
    const getAllUsers = userService.getAllUsers();
    res.send({status: 'OK', data: getAllUsers});
};

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


