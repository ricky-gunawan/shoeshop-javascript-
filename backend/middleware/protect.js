const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization || authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decode.data);

      req.user = user;
      next();
    } else {
      throw new Error("Not Authorized");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = protect;
