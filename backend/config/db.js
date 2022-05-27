const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/shoeshop");

    console.log(`mongodb connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = connectDB;
