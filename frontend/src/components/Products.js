import productList from "../assets/productList";
import ProductCard from "./ProductCard";

export default function Products() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 m-4 place-items-center">
      {productList.map((product) => (
        <ProductCard img={product.img} name={product.name} price={product.price} />
      ))}
    </div>
  );
}
