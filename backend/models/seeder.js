const productsList = require("./productsList");
const userList = require("./userList");
const Cart = require("./cartModel");
const Order = require("./orderModel");
const Product = require("./productModel");
const User = require("./userModel");
const connectDB = require("../config/db");

connectDB();

const importData = async () => {
  try {
    await Cart.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany(productsList);
    await User.insertMany(userList);
    console.log("data imported");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Cart.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("data destroyed");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
