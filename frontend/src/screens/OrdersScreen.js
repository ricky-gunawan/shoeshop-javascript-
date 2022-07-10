import { useState } from "react";
import { useSelector } from "react-redux";
import Order from "../components/Order";
import PaymentModal from "../components/PaymentModal";

export default function OrdersScreen() {
  const { userOrders } = useSelector((store) => store.user);
  const [paymentModal, setPaymentModal] = useState(false);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Orders</div>
      <div className="mt-28 m-4">
        <PaymentModal paymentModal={paymentModal} setPaymentModal={setPaymentModal} />
        {userOrders == true ? (
          userOrders.map((order) => (
            <Order key={order._id} date={order.date} items={order.items} totalItems={order.totalItems} totalPrice={order.totalPrice} address={order.address} payment={order.payment} isPaid={order.isPaid} setPaymentModal={setPaymentModal} />
          ))
        ) : (
          <div className="text-center text-xl">No Orders Yet</div>
        )}
      </div>
    </div>
  );
}
