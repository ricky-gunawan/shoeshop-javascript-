const Product = require("./productModel");
const connectDB = require("../config/db");

connectDB();

const importProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(productList);
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

const productList = [
  {
    name: "Adidas 1",
    img: "/images/1.webp",
    price: "1000000",
    description: "1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus porro exercitationem cumque dolorum enim repellat a impedit deserunt consequuntur ut!",
  },
  {
    name: "Adidas 2",
    img: "/images/2.webp",
    price: "2000000",
    description:
      "2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quidem aliquam officia expedita mollitia magnam atque, quod commodi exercitationem sint excepturi possimus hic, voluptate aliquid praesentium illum iure! Nesciunt officiis nisi deleniti quia assumenda officia mollitia. Atque culpa aspernatur asperiores.",
  },
  {
    name: "Adidas 3",
    img: "/images/3.webp",
    price: "3000000",
    description: "3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque natus magni facere obcaecati praesentium enim, quae unde quos asperiores nisi hic laudantium dicta, quasi consectetur.",
  },
  {
    name: "Adidas 4",
    img: "/images/4.webp",
    price: "4000000",
    description: "4 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur officiis voluptas ut iusto provident sint ea magnam facere delectus unde eos exercitationem quasi saepe tempora cum, recusandae sunt sit ex.",
  },
  {
    name: "Adidas 5",
    img: "/images/5.webp",
    price: "5000000",
    description:
      "5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, quam quis nobis laboriosam eaque minus ducimus aliquid deserunt cupiditate quas accusantium? Voluptates accusamus quaerat earum illo, alias magnam architecto. Similique distinctio totam consequatur possimus id?",
  },
  {
    name: "Adidas 6",
    img: "/images/6.webp",
    price: "6000000",
    description: "6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, iusto sapiente. Ab rem inventore natus aspernatur adipisci doloribus nisi, est dicta nulla iste maxime tenetur.",
  },
];
