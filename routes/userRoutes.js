const express = require('express');
const { getAllUsers, registerController, loginController, sendDataController, getDataController } = require('../controllers/userController');

const router = express.Router();

router.get('/all-users', getAllUsers);

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/senddata', sendDataController);

router.get('/getdata', getDataController);

module.exports = router