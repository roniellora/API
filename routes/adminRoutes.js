const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getAllUsersController, getAllEmployeesController, changeStatusController} = require('../controllers/adminCtrl');

const router = express.Router();

//GET ALL USER
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET ALL EMPLOYEES
router.get('/getAllEmployees', authMiddleware, getAllEmployeesController)

//CHANGE ACCOUNT STATUS
router.post('/changeStatus', authMiddleware, changeStatusController)


module.exports = router;