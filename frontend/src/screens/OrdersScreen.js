import Order from "../components/Order";

const Orders = [
  {
    items: "nike, puma, adidas, converse, new balance, puma, adidas, converse, new balance",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "paypal",
    paid: false,
  },
  {
    items: "nike, puma, adidas",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "bitcoin",
    paid: false,
  },
  {
    items: "nike, puma, adidas",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "stripe",
    paid: true,
  },
];
export default function OrdersScreen() {
  return (
    <div>
      <div className="text-center border-b-2 text-x font-bold fixed p-2 top-16 w-full h-fit bg-white">My Orders</div>
      <div className="mt-28 flex flex-wrap items-stretch">
        {Orders.map((order) => (
          <Order items={order.items} total={order.total} address={order.address} payment={order.payment} paid={order.paid} />
        ))}
      </div>
    </div>
  );
}
