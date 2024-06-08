const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getEmployeeInfoController, updateProfileController } = require('../controllers/employeeCtrl');

const router = express.Router();

//GET SINGLE EMPLOYEE INFO
router.post('/getEmployee', authMiddleware, getEmployeeInfoController)

//UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController)


module.exports = router;