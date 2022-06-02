export default function Order({ items, total, address, payment, paid }) {
  return (
    <div className="border-2 self-start max-w-xs rounded-lg p-1 m-2">
      <div className="mx-auto w-fit font-semibold text-lg">Order Details</div>
      <table className="border-t-4">
        <tr className="">
          <td className="p-2 align-top">Items</td>
          <td className="w-4 p-2 align-top">:</td>
          <td className="p-2 align-top">{items}</td>
        </tr>
        <tr className="">
          <td className="p-2 align-top">Total</td>
          <td className="p-2 align-top">:</td>
          <td className="p-2 align-top">Rp. {total}</td>
        </tr>
        <tr className="">
          <td className="p-2 align-top">Address</td>
          <td className="p-2 align-top">:</td>
          <td className="p-2 align-top">{address}</td>
        </tr>
        <tr className="">
          <td className="p-2">Payment</td>
          <td className="p-2">:</td>
          <td className="p-2">{payment}</td>
        </tr>
      </table>
      <div className="flex justify-end">
        {paid ? (
          <span className="m-2 p-2 uppercase bg-green-600 rounded-lg text-white text-sm font-semibold">Paid</span>
        ) : (
          <div>
            <span className="m-2 p-2 uppercase bg-yellow-600 rounded-lg text-white text-sm font-semibold">Unpaid</span>
            <button className="m-2 p-2 uppercase bg-cyan-400 rounded-lg text-white text-sm font-semibold">Pay Now</button>
          </div>
        )}
      </div>
    </div>
  );
}
