import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import OrderList from "../components/OrderList";
import { getAllOrders } from "../features/admin/adminSlice";

export default function AdminOrders() {
  const { isLoading, orders } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  let num = 0;
  orders &&
    orders.forEach(() => {
      num = num + 1;
    });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Manage Orders</div>
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
                <th>id</th>
                <th>user</th>
                <th>date</th>
                <th className="px-4">total items</th>
                <th>total price</th>
                <th>address</th>
                <th>payment</th>
                <th>isPaid</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(({ _id, user, date, items, totalItems, totalPrice, address, payment, isPaid }) => (
                <OrderList key={_id} _id={_id} user={user} date={date} items={items} totalItems={totalItems} totalPrice={totalPrice} address={address} payment={payment} isPaid={isPaid} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
