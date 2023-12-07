const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .get('/', userController.getAllUsers)
    .get('/:userId', userController.getOneUser)
    .post('/', userController.createNewUser)
    .put('/:userId', userController.updateOneUser)
    .delete('/:userId', userController.deleteOneUser);


module.exports = router;

//router.post('/users', (req, res) => {
    //const user = userController.createNewUser(req.body);
    //user 
        //.save()
        //.then((data) => res.json(data))
        //.catch((error) => res.json({ message: error }));
//});