const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .post('/', userController.createNewUser)

module.exports = router;

//router.post('/users', (req, res) => {
    //const user = userController.createNewUser(req.body);
    //user 
        //.save()
        //.then((data) => res.json(data))
        //.catch((error) => res.json({ message: error }));
//});