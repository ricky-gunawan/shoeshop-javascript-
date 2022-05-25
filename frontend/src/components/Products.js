import { Link } from "react-router-dom";
import { getAllProducts } from "../assets/productList";
import ProductCard from "./ProductCard";

export default function Products() {
  const productList = getAllProducts();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 m-4 place-items-center">
      {productList.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <ProductCard img={product.img} name={product.name} price={product.price} />
        </Link>
      ))}
    </div>
  );
}
