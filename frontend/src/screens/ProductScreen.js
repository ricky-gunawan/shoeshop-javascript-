import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
// import { getProductDetail } from "../assets/productList";

export default function ProductScreen() {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${params.productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailProduct();
  }, []);
  const { name, img, price, brand, color, description } = product;
  return (
    <div className="mt-20">
      <ProductDetail name={name} img={img} price={price} brand={brand} color={color} description={description} />
    </div>
  );
}
