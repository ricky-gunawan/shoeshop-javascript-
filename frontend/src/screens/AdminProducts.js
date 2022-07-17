import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ProductList from "../components/ProductList";
import { getAllProducts } from "../features/admin/adminSlice";

export default function AdminProducts() {
  const { isLoading, products } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  let num = 0;
  products &&
    products.forEach(() => {
      num = num + 1;
    });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Manage Products</div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-28 w-fit mx-auto">
          <div className="mb-2 pt-2 flex justify-between">
            <div>Total: {num}</div>
            <Link to={"/admin/products/add"} className="p-1 uppercase bg-cyan-400 hover:bg-cyan-500 rounded-lg text-white text-sm font-semibold">
              add product
            </Link>
          </div>
          <table>
            <thead className="text-center border-y-2">
              <tr>
                <th>id</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>brand</th>
                <th>color</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ _id, img, name, price, brand, color, description }) => (
                <ProductList key={_id} _id={_id} img={img} name={name} price={price} brand={brand} color={color} description={description} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
