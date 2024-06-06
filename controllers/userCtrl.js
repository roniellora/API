const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')

//REGISTER CONTROLLER
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email})

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'})
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        const newUser = new userModel(req.body)
        await newUser.save()

        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error', error})
    }
}

//LOGIN CONTROLLER
const loginController = () => {}

module.exports = { loginController, registerController}