import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { getProductDetail } from "../assets/productList";

export default function ProductScreen() {
  const params = useParams();
  const { name, img, price, description } = getProductDetail(params.productId);
  return (
    <div className="mt-20">
      <ProductDetail name={name} img={img} price={price} description={description} />
    </div>
  );
}
