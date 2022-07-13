const path = require("path");

// bcrypt
const bcrypt = require("bcryptjs");

// jwt
const jwt = require("jsonwebtoken");

// dotenv
require("dotenv").config();
const port = process.env.PORT;

// express
const express = require("express");
const app = express();

// mongoose
const connectDB = require("./config/db");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Cart = require("./models/cartModel");
const protect = require("./middleware/protect");
const Order = require("./models/orderModel");

connectDB();

////////////////////////////////////////////

app.use(express.json());

////////////////////////////////////////////
// GET filtered products
app.get("/api/products/search", async (req, res) => {
  const { brand, color } = req.query;
  try {
    if (brand === "all" && color === "all") {
      const Products = await Product.find({});
      res.json(Products);
    } else if (brand === "all") {
      const Products = await Product.find({ color: color });
      res.json(Products);
    } else if (color === "all") {
      const Products = await Product.find({ brand: brand });
      res.json(Products);
    } else {
      const Products = await Product.find({ brand: brand, color: color });
      res.json(Products);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET single product
app.get("/api/products/:id", async (req, res) => {
  const params = req.params.id;
  try {
    const searchProduct = await Product.findById(params);
    searchProduct ? res.json(searchProduct) : res.status(404).send("couldn't find the product");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//POST new product
app.post("/api/product", async (req, res) => {
  const newProduct = req.body;
  try {
    await Product.create(newProduct);
    res.status(201).send("berhasil menambahkan product");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//PATCH updating product
app.patch("/api/product/:id", async (req, res) => {
  const params = req.params.id;
  const updatedProduct = req.body;

  try {
    await Product.findByIdAndUpdate(params, updatedProduct);
    res.send("Product updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//DELETE product
app.delete("/api/product/:id", async (req, res) => {
  const params = req.params.id;
  try {
    await Product.findByIdAndDelete(params);
    res.status(201).send("succeed deleting product");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

///////////////////////////////////////////////////////////////////
// POST user
// user login
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const pass = await bcrypt.compare(password, user.password);

    if (user && pass) {
      const cart = (await Cart.findOne({ user: user._id })) || (await Cart.create({ user: user._id, items: [] }));
      res.send({
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          isAdmin: user.isAdmin,
          token: jwt.sign({ data: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" }),
        },
        userCart: cart,
      });
    } else {
      res.status(400).send("password do not match");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// POST user
// user sign up
app.post("/api/user/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(400).send("email has been used");
    } else {
      await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          User.create({ name, email, password: hash, address });
        });
      });
      res.status(201).send("user created");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

// PATCH user
// edit user profile
app.patch("/api/user/edit", protect, async (req, res) => {
  const { name, email, password, address } = req.body;
  const newData = { ...(name && { name }), ...(email && { email }), ...(address && { address }) };
  const userId = req.user._id;
  try {
    const user = await User.findOne({ email, _id: { $ne: userId } });
    let newProfile;

    if (user) {
      res.status(400).send("email has been used");
    } else {
      if (password) {
        const hashPassword = await bcrypt.hashSync(password, 10);
        newProfile = await User.findOneAndUpdate({ _id: userId }, { $set: { ...newData, password: hashPassword } }, { runValidators: true, new: true });
      } else {
        newProfile = await User.findOneAndUpdate({ _id: userId }, { $set: newData }, { runValidators: true, new: true });
      }

      res.status(200).send({
        id: newProfile._id,
        name: newProfile.name,
        email: newProfile.email,
        address: newProfile.address,
        token: jwt.sign({ data: newProfile._id }, process.env.JWT_SECRET, { expiresIn: "30d" }),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////////////////////////////////////////////////
//POST cart
//get all cart item
app.post("/api/cart", protect, async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = (await Cart.findOne({ user: userId })) || (await Cart.create({ user: userId, items: [] }));
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PATCH cart
// add cart item
app.patch("/api/cart/add", protect, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  try {
    const product = await Product.findById(productId);
    const newItem = {
      product: product._id,
      name: product.name,
      img: product.img,
      price: product.price,
      brand: product.brand,
      color: product.color,
    };
    const newCart = await Cart.findOneAndUpdate({ user: userId, "items.product": { $ne: productId } }, { $push: { items: newItem } }, { runValidators: true, new: true });
    res.status(201).send(newCart);
  } catch (error) {
    res.status(400).send(error);
  }
});

//PATCH cart
//remove cart item
app.patch("/api/cart/delete", protect, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;
  try {
    const newCart = await Cart.findOneAndUpdate({ user: userId }, { $pull: { items: { product: productId } } }, { new: true });
    res.status(200).send(newCart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// PATCH cart
// change product quantity
app.patch("/api/cart/quantity", protect, async (req, res) => {
  const { productId, increase } = req.body;
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }, { items: { $elemMatch: { product: productId } } });
    const quantity = cart.items[0].quantity;
    const newQuantity = quantity == 1 && !increase ? 1 : increase ? quantity + 1 : quantity - 1;
    const newCart = await Cart.findOneAndUpdate({ user: userId, "items.product": productId }, { $set: { "items.$.quantity": newQuantity } }, { runValidators: true, new: true });
    res.status(201).send(newCart);
  } catch (error) {
    res.status(400).send(error);
  }
});

///////////////////////////////////////////////////////////////////////////
// POST order
// add an order
app.post("/api/order", protect, async (req, res) => {
  const { orderDetail } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }, { _id: 0, __v: 0, items: { _id: 0 } });
    const order = { date: new Date().toLocaleString(), user: cart.user, items: cart.items, ...orderDetail };
    await Order.create(order);
    const allOrder = await Order.find({ user: userId });
    await Cart.updateOne({ user: userId }, { $set: { items: [] } });
    res.status(201).send(allOrder);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////////////////////////////////////////////////////////
// GET admin products
// get all products
app.get("/api/admin/products", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).send(allProducts);
  } catch (error) {
    res.send(error);
  }
});

// GET admin single product
// get single products
app.get("/api/admin/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const singleProduct = await Product.findById(productId);
    res.status(200).send(singleProduct);
  } catch (error) {
    res.send(error);
  }
});

// DELETE admin products
// get all products
app.delete("/api/admin/products", async (req, res) => {
  const { productId } = req.body;
  console.log(productId);
  try {
    await Product.deleteOne({ _id: productId });
    const allProducts = await Product.find({});
    res.status(200).send(allProducts);
  } catch (error) {
    res.send(error);
  }
});

// static file
app.use("/static", express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
