import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductDetail from "../components/ProductDetail";
import { getProductDetail } from "../features/products/productDetailSlice";

export default function ProductScreen() {
  const { _id, name, img, price, brand, color, description } = useSelector((store) => store.product.productDetail);
  const isLoading = useSelector((store) => store.product.isLoading);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductDetail(`/api/products/${params.productId}`));
  }, [params, dispatch]);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Product Details</div>
      <div className="mt-32">
        {isLoading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <ProductDetail id={_id} name={name} img={img} price={price} brand={brand} color={color} description={description} />
        )}
      </div>
    </div>
  );
}
