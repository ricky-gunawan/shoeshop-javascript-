import ProductDetail from "../components/ProductDetail";
import productList from "../assets/productList";

const { name, img, price } = productList[0];
export default function ProductScreen() {
  return (
    <div className="mt-20">
      <ProductDetail name={name} img={img} price={price} />;
    </div>
  );
}
