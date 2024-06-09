const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getEmployeeInfoController, updateProfileController, getEmployeeByIdController } = require('../controllers/employeeCtrl');

const router = express.Router();

//GET SINGLE EMPLOYEE INFO
router.post('/getEmployee', authMiddleware, getEmployeeInfoController)

//UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController)

//POST GET SINGLE EMPLOYEE INFO
router.post('/getEmployeeById', authMiddleware, getEmployeeByIdController)


module.exports = router;