const express = require('express');
const { loginController, registerController, authController, applyController } = require('../controllers/userCtrl');
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

//APPLY ROUTE
router.post('/apply', authMiddleware, applyController)

module.exports = router;