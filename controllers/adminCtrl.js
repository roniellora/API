const employeeModel = require("../models/employeeModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res
      .status(200)
      .send({ message: "Users Fetched!", success: true, data: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Fetching Users!", success: false, error });
  }
};


const getAllEmployeesController = async (req, res) => {
  try {
    const employees = await employeeModel.find({});
    res
      .status(200)
      .send({ message: "Employees Fetched!", success: true, data: employees });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Fetching Employees!", success: false, error });
  }
};

const changeStatusController = async (res, req) => {
  try {
    const {employeeId, status} = req.body;
    const employee = await employeeModel.findByIdAndUpdate(employeeId, {status})
    if (!employee) {
      return res.status(404).send({ message: "Employee not found", success: false });
    }
    const user = await userModel.findOne({_id: employee.userId})
    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }
    const notifications = user.notifications;
    notifications.push({
      type: 'Employee account request',
      message: `Your employee account request has been ${status}`,
      onClickPath: '/notifications'
    })

    user.isEmployee = status === 'approved' ? true : false;
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).send({ message: "Error saving user", success: false });
    }
    res.status(200).send({
      success: true,
      message: 'Account status updated',
      data: employee
    })
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error changing status!", success: false, error: error.message });
  }
};

module.exports = {
  getAllUsersController,
  getAllEmployeesController,
  changeStatusController,
};
