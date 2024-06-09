const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required!']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    address: {
        type: String,
        required: [true, 'Address is required!']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required!']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required!']
    },
    fee: {
        type: Number,
        required: [true, 'Fee is required!']
    },
    timings:{
        type: Object,
        required: [true, 'Timings are required!']
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps: true});

const EmployeeModel = mongoose.model('employees', employeeSchema);
module.exports = EmployeeModel;