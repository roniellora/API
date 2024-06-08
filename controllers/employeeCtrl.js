const employeeModels = require("../models/employeeModel");

const getEmployeeInfoController = async (req, res) => {
  try {
    const employee = await employeeModels.findOne({ userId: req.body.userId });
    if (!employee) {
      return res
        .status(404)
        .send({ message: "Employee not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        message: "Employee fetched",
        data: employee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Fetching Employee Info!",
      success: false,
      error,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const employee = await employeeModels.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    if (!employee) {
      return res
        .status(404)
        .send({ message: "Employee not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        message: "Employee profile updated",
        data: employee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating profile!",
      success: false,
      error,
    });
  }
};

module.exports = { getEmployeeInfoController, updateProfileController };
