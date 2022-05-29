const productsList = require("./productsList");
const Product = require("./productModel");
const connectDB = require("../config/db");

connectDB();

const importProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(productsList);
    console.log("data imported");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("data destroyed");
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyProducts();
} else {
  importProducts();
}
