const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      name: { type: String, required: true },
      img: { type: String, required: true },
      price: { type: String, required: true },
      brand: { type: String, required: true },
      color: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
