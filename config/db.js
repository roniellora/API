require("dotenv").config();

const mongoose = require("mongoose");
const colors = require("colors");

const MongoDB = process.env.MONGODB_URL;
if (!MongoDB) {
  console.error("Error: MONGO_URL is not defined".red.underline.bold);
  process.exit(1);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MongoDB);

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
