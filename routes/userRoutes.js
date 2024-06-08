const express = require('express');
const { loginController, registerController, authController, applyController, allNotificationsController, deleteAllNotificationsController } = require('../controllers/userCtrl');
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

//NOTIFICATION ROUTE
router.post('/notification', authMiddleware, allNotificationsController)

//NOTIFICATION DELETE ROUTE
router.post('/notification-delete', authMiddleware, deleteAllNotificationsController)

module.exports = router;