const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/authMiddleware');

//router
const router = express.Router();

//routes
//LOGIN ROUTE
router.post('/login', loginController);

//REGISTER ROUTE
router.post('/register', registerController);

//AUTH ROUTE
router.post('/getUserData', authMiddleware, authController)

module.exports = router;