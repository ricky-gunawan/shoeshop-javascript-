import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import Loader from "./Loader";

export default function Products() {
  const productItems = useSelector((store) => store.products.productItems);
  const isLoading = useSelector((store) => store.products.isLoading);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProducts("/api/products/search?brand=all&color=all"));
  }, [dispatch, params]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 m-4 place-items-start">
          {productItems.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard img={product.img} name={product.name} price={product.price} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
