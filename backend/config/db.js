const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`mongodb connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
