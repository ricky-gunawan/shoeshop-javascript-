import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          <div>Total: {num}</div>
          <table>
            <thead className="text-center border-y-2">
              <tr>
                <th className="">ID</th>
                <th>image</th>
                <th>name</th>
                <th>price</th>
                <th>brand</th>
                <th>color</th>
                <th className="">description</th>
              </tr>
            </thead>
            <tbody className="">
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
