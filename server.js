const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');

//dotenv
dotenv.config();

//mongodb connection
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(cors({ origin: ['http://localhost:5173', 'https://api-lyart-gamma-50.vercel.app/'] }));
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.sendStatus(200);
});

//routes
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/employee', require('./routes/EmployeeRoutes'));

//port
const PORT = process.env.PORT || 3000;


//listen port
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_MODE} on port ${PORT} `.yellow.bold);
});