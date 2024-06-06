const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//dotenv
dotenv.config();

//mongodb connection
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/users', require('./routes/userRoutes'));

//port
const PORT = process.env.PORT || 3000;


//listen port
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_MODE} on port ${PORT} `.yellow.bold);
});