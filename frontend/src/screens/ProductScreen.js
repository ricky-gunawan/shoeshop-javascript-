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
  }, [params]);
  const { name, img, price, brand, color, description } = product;
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Product Details</div>
      <div className="mt-32">
        <ProductDetail name={name} img={img} price={price} brand={brand} color={color} description={description} />
      </div>
    </div>
  );
}
