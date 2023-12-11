const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../database/schema/userSchema');
const userController = require('../../controllers/userController');

router
    .get('/', userController.getAllUsers)
    .get('/:userId', userController.getOneUser)
    .post('/createPersona', userController.createNewUserPer)
    .post('/createEmpresa', userController.createNewUserEmp)
    .put('/:userId', userController.updateOneUser)
    .delete('/:userId', userController.deleteOneUser)

    // Authentication
    .get('/authenticate', async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!User) {
                return res.status(401).json({ message: 'El usuario no existe' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: 86400,
            });
            res.status(200).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
);

module.exports = router;
