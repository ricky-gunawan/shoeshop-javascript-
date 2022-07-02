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
    if (searchProduct) {
      res.json(searchProduct);
    } else {
      res.status(404).send("couldn't find the product");
    }
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
      res.status(400).send("email already used");
    } else {
      await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          // Store hash in your password DB.
          User.create({ name, email, password: hash, address });
        });
      });
      res.status(201).send("user created");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

/////////////////////////////////////////////////////////////////
//POST cart
//get all cart item
app.post("/api/cart", async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = (await Cart.findOne({ user: userId })) || (await Cart.create({ user: userId, items: [] }));
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PATCH cart
// create cart item
app.patch("/api/cart", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const product = await Product.findById(productId);
    const cart = await Cart.findOne({ user: userId });
    let add = true;
    cart.items.map((item) => {
      if (item.product == productId) {
        add = false;
      }
    });
    if (add) {
      const newItems = [
        ...cart.items,
        {
          product: product._id,
          name: product.name,
          img: product.img,
          price: product.price,
          brand: product.brand,
          color: product.color,
        },
      ];
      await Cart.findOneAndUpdate({ user: userId }, { items: newItems }, { runValidators: true });
      const newCart = await Cart.findOne({ user: userId });
      res.status(201).send(newCart);
    }
    res.end();
  } catch (error) {
    res.status(400).send(error);
  }
});

//DELETE cart
//remove cart item
app.delete("/api/cart", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    const newItems = [];
    cart.items.map((item) => {
      if (item.product != productId) {
        newItems.push(item);
      }
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: newItems });
    const newCart = await Cart.findOne({ user: userId });
    res.status(201).send(newCart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// static file
app.use("/static", express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
