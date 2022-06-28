const bcrypt = require("bcryptjs");

const userList = [
  {
    name: "Joko",
    email: "joko@contoh.com",
    password: bcrypt.hashSync("joko12345", 10),
    address: "jalan lurus tanpa belokan, Bandung",
  },
  {
    name: "Rian",
    email: "rian@contoh.com",
    password: bcrypt.hashSync("rian12345", 10),
    address: "jalan terus pantang mundur, Bandung",
  },
  {
    name: "Fahri",
    email: "fahri@contoh.com",
    password: bcrypt.hashSync("fahri12345", 10),
    address: "jalan kaki di tempat, Bandung",
    isAdmin: true,
  },
];

module.exports = userList;
