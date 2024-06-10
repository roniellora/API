const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("../models/employeeModel");
const appointmentModel = require("../models/appointmentModel");

//REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Auth Error!", success: false, error });
  }
};

//APPLY CONTROLLER
const applyController = async (req, res) => {
  try {
    const newEmployee = await EmployeeModel({ ...req.body, status: "pending" });
    await newEmployee.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notifications = adminUser.notifications;
    notifications.push({
      type: "Apply as employee",
      message: `New application from ${newEmployee.firstName} ${newEmployee.lastName}`,
      data: {
        employeId: newEmployee._id,
        name: newEmployee.firstName + " " + newEmployee.lastName,
        onclickPath: "/admin/employees",
      },
    });
    await userModel.findOneAndUpdate(adminUser._id, { notifications });
    res
      .status(200)
      .send({ message: "Application sent successfully!", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error applying for employee!", success: false, error });
  }
};

const allNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotifications = user.seenNotifications;
    const notifications = user.notifications;

    seenNotifications.push(...notifications);
    user.notifications = [];
    user.seenNotifications = notifications;

    const updatedUser = await user.save();
    res.status(200).send({
      message: "Notifications marked as read!",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error fetching notifications", success: false, error });
  }
};

const deleteAllNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifications = [];
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "Notifications deleted successfully!",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error deleting notifications", success: false, error });
  }
};

//GET ALL EMPLOYEES
const getEmployeesController = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({ status: "approved" });
    res.status(200).send({
      message: "Employees fetched succesfully!",
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error fetching employees!", success: false, error });
  }
};

//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifications.push({
      type: "Appointment",
      message: `New appointment request from ${req.body.userInfo.name}`,
      onclickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error booking appointment!", success: false, error });
  }
};

//APPOINTMENT LIST
const appointmentListController = async (req, res) => {
  try {
    const appointments = await appointmentModel.findMany({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyController,
  allNotificationsController,
  deleteAllNotificationsController,
  getEmployeesController,
  bookAppointmentController,
  appointmentListController,
};
