import Order from "../components/Order";

const Orders = [
  {
    date: new Date().toLocaleString(),
    items: "nike, puma, adidas, converse, new balance, puma, adidas, converse, new balance",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "paypal",
    isPaid: false,
  },
  {
    date: new Date().toLocaleString(),
    items: "nike, puma, adidas",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "bitcoin",
    isPaid: false,
  },
  {
    date: new Date().toLocaleString(),
    items: "nike, puma, adidas",
    total: 2000000,
    address: "jalan lurus tanpa belokan",
    payment: "stripe",
    isPaid: true,
  },
];
export default function OrdersScreen() {
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Orders</div>
      <div className="mt-28 m-4">
        {Orders.map((order) => (
          <Order date={order.date} items={order.items} total={order.total} address={order.address} payment={order.payment} isPaid={order.isPaid} />
        ))}
      </div>
    </div>
  );
}
