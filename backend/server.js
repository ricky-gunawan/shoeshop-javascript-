const path = require("path");

// bcrypt
const bcrypt = require("bcryptjs");

// jwt
const jwt = require("jsonwebtoken");

// dotenv
require("dotenv").config();
const port = process.env.PORT;

// multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/assets/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname);
  },
});
const upload = multer({ storage });

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
      const order = await Order.find({ user: user._id });
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
        userOrders: order,
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
app.get("/api/cart", protect, async (req, res) => {
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
//GET order
//get all order items
app.get("/api/orders", protect, async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Order.find({ user: userId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

// POST admin product
// edit product
app.post("/api/admin/products", upload.single("image"), async (req, res) => {
  const { _id, img, name, price, brand, color, description } = req.body;
  const newImage = req.file ? req.file.filename : img;

  try {
    if (_id) {
      await Product.findOneAndUpdate({ _id }, { $set: { img: newImage, name, price, brand, color, description } }, { runValidators: true });
    } else {
      await Product.create({ img: newImage, name, price, brand, color, description });
    }
  } catch (error) {
    res.send(error);
  }
});

// DELETE admin products
// get all products
app.delete("/api/admin/products", async (req, res) => {
  const { productId } = req.body;
  try {
    await Product.deleteOne({ _id: productId });
    const allProducts = await Product.find({});
    res.status(200).send(allProducts);
  } catch (error) {
    res.send(error);
  }
});

////////////////////////////////////////////////////////////////////
// GET admin users
// get all users
app.get("/api/admin/users", async (req, res) => {
  try {
    const allUsers = await User.find({}).select({ password: 0 });
    res.status(200).send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

// GET admin single user
// get single user
app.get("/api/admin/users/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const singleUser = await User.findById(userId);
    res.status(200).send(singleUser);
  } catch (error) {
    res.send(error);
  }
});

// POST admin user
// edit user
app.post("/api/admin/users", async (req, res) => {
  const { _id, isAdmin } = req.body;
  try {
    await User.findOneAndUpdate({ _id }, { $set: { isAdmin } }, { runValidators: true });
  } catch (error) {
    res.send(error);
  }
});

// DELETE admin users
// delete user
app.delete("/api/admin/users", async (req, res) => {
  const { userId } = req.body;

  try {
    await User.deleteOne({ _id: userId });
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.send(error);
  }
});

////////////////////////////////////////////////////////////////////
// GET admin orders
// get all orders
app.get("/api/admin/orders", async (req, res) => {
  try {
    const allOrders = await Order.find({});
    res.status(200).send(allOrders);
  } catch (error) {
    res.send(error);
  }
});

// GET admin single order
// get single order
app.get("/api/admin/orders/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const singleOrder = await Order.findById(orderId);
    res.status(200).send(singleOrder);
  } catch (error) {
    res.send(error);
  }
});

// POST admin order
// edit order
app.post("/api/admin/orders", async (req, res) => {
  const { _id, isPaid } = req.body;
  try {
    await Order.findOneAndUpdate({ _id }, { $set: { isPaid } }, { runValidators: true });
  } catch (error) {
    res.send(error);
  }
});

// DELETE admin orders
// delete order
app.delete("/api/admin/orders", async (req, res) => {
  const { orderId } = req.body;

  try {
    await Order.deleteOne({ _id: orderId });
    const allOrders = await Order.find({});
    res.status(200).send(allOrders);
  } catch (error) {
    res.send(error);
  }
});

////// static file
// assets/image
app.use("/static", express.static(path.join(__dirname, "assets")));

// frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
