const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');

//router
const router = express.Router();

//routes
//LOGIN ROUTE
router.post('/login', loginController);

//REGISTER ROUTE
router.post('/register', registerController);

module.exports = router;