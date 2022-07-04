import { useSelector } from "react-redux";
import Order from "../components/Order";

export default function OrdersScreen() {
  const { userOrders } = useSelector((store) => store.user);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Orders</div>
      <div className="mt-28 m-4">
        {userOrders.map((order) => (
          <Order key={order._id} date={order.date} items={order.items} totalItems={order.totalItems} totalPrice={order.totalPrice} address={order.address} payment={order.payment} isPaid={order.isPaid} />
        ))}
      </div>
    </div>
  );
}
