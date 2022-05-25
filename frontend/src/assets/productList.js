const productList = [
  {
    id: 1,
    name: "Adidas 1",
    img: require("./1.webp"),
    price: "1000000",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus porro exercitationem cumque dolorum enim repellat a impedit deserunt consequuntur ut!",
  },
  {
    id: 2,
    name: "Adidas 2",
    img: require("./2.webp"),
    price: "2000000",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quidem aliquam officia expedita mollitia magnam atque, quod commodi exercitationem sint excepturi possimus hic, voluptate aliquid praesentium illum iure! Nesciunt officiis nisi deleniti quia assumenda officia mollitia. Atque culpa aspernatur asperiores.",
  },
  {
    id: 3,
    name: "Adidas 3",
    img: require("./3.webp"),
    price: "3000000",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque natus magni facere obcaecati praesentium enim, quae unde quos asperiores nisi hic laudantium dicta, quasi consectetur.",
  },
  {
    id: 4,
    name: "Adidas 4",
    img: require("./4.webp"),
    price: "4000000",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur officiis voluptas ut iusto provident sint ea magnam facere delectus unde eos exercitationem quasi saepe tempora cum, recusandae sunt sit ex.",
  },
  {
    id: 5,
    name: "Adidas 5",
    img: require("./5.webp"),
    price: "5000000",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, quam quis nobis laboriosam eaque minus ducimus aliquid deserunt cupiditate quas accusantium? Voluptates accusamus quaerat earum illo, alias magnam architecto. Similique distinctio totam consequatur possimus id?",
  },
  {
    id: 6,
    name: "Adidas 6",
    img: require("./6.webp"),
    price: "6000000",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, iusto sapiente. Ab rem inventore natus aspernatur adipisci doloribus nisi, est dicta nulla iste maxime tenetur.",
  },
];

const getAllProducts = () => {
  return productList;
};

const getProductDetail = (id) => productList.filter((product) => product.id === Number(id))[0];

export { getAllProducts, getProductDetail };
