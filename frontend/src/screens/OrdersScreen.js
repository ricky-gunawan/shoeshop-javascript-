import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Order from "../components/Order";
import PaymentModal from "../components/PaymentModal";
import { setUserOrders } from "../features/user/userSlice";

export default function OrdersScreen() {
  const dispatch = useDispatch();
  const { userInfo, userOrders } = useSelector((store) => store.user);
  const [paymentModal, setPaymentModal] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders", { headers: { authorization: `Bearer ${userInfo.token}` } });
        data && dispatch(setUserOrders(data));
      } catch (error) {
        alert("error, try again!");
        console.log(error);
      }
    };
    getOrders();
  });

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Orders</div>
      <div className="mt-28 m-4">
        <PaymentModal paymentModal={paymentModal} setPaymentModal={setPaymentModal} />
        {Array.isArray(userOrders) && userOrders.length ? (
          userOrders.map((order) => (
            <Order key={order._id} date={order.date} items={order.items} totalItems={order.totalItems} totalPrice={order.totalPrice} address={order.address} payment={order.payment} isPaid={order.isPaid} setPaymentModal={setPaymentModal} />
          ))
        ) : (
          <div className="text-center text-lg">No Order Yet</div>
        )}
      </div>
    </div>
  );
}
