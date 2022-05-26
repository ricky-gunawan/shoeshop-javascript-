// dotenv
require("dotenv").config();
const port = process.env.PORT;

// express
const express = require("express");
const app = express();

// mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:3000/products");
const Products = require("./models/productsModel");

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.send("test get all");
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
