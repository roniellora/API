const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getEmployeeInfoController } = require('../controllers/employeeCtrl');

const router = express.Router();

//GET SINGLE EMPLOYEE INFO
router.post('/getEmployee', authMiddleware, getEmployeeInfoController)

module.exports = router;