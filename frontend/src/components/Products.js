import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { getAllProducts } from "../assets/productList";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 m-4 place-items-center">
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
          <ProductCard img={product.img} name={product.name} price={product.price} />
        </Link>
      ))}
    </div>
  );
}
