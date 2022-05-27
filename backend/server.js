// dotenv
require("dotenv").config();
const port = process.env.PORT;

// express
const express = require("express");
const app = express();

// mongoose
const connectDB = require("./config/db");
const Product = require("./models/productModel");

connectDB();

////////////////////////////////////////////

app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const Products = await Product.find({});
    res.json(Products);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/products/:id", (req, res) => {
  const params = req.params.id;
  res.send(`test get one, id: ${params}`);
});
app.post("/api/product", (req, res) => {
  res.send(req.body);
});
app.patch("/api/product/:id", (req, res) => {
  const params = req.params.id;
  res.send(`test patch, id: ${params}`);
});
app.delete("/api/product/:id", (req, res) => {
  const params = req.params.id;
  res.send(`test delete, id: ${params}`);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
