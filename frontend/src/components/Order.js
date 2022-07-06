export default function Order({ date, items, totalItems, totalPrice, address, payment, isPaid }) {
  return (
    <div className="border-2 self-start w-full rounded-lg p-1 my-4">
      <div className="mx-auto w-fit font-semibold text-lg border-b-2">Order Details {`(${date})`}</div>
      <table className="">
        <tbody>
          <tr className="">
            <td className="p-2 align-top">Items</td>
            <td className="w-4 p-2 align-top">:</td>
            <td className="p-2 align-top flex flex-wrap gap-2">
              {items.map((item) => (
                <div key={item._id} className="flex gap-2 justify-center w-fit border p-1">
                  <div className="overflow-hidden grow-0">
                    <img className="rounded-lg my-1 sm:ml-4" width={100} src={item.img} alt={item.name} />
                  </div>
                  <div className="mt-1 grow sm:ml-2">
                    <h2 className="text-base font-semibold uppercase">{item.name}</h2>
                    <h3 className="text-xs">
                      Brand: <span className="uppercase">{item.brand}</span>
                    </h3>
                    <h3 className="text-xs">
                      Color: <Color color={item.color} />
                    </h3>
                    <h2 className="text-md my-1 underline">Rp. {item.price}</h2>
                    <h3 className="text-sm">Quantity: {item.quantity}</h3>
                  </div>
                </div>
              ))}
            </td>
          </tr>
          <tr className="">
            <td className="p-2 align-top">Total Items</td>
            <td className="p-2 align-top">:</td>
            <td className="p-2 align-top">Rp. {totalItems}</td>
          </tr>
          <tr className="">
            <td className="p-2 align-top">Total Price</td>
            <td className="p-2 align-top">:</td>
            <td className="p-2 align-top">Rp. {totalPrice}</td>
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
          <tr className="">
            <td className="p-2">Payment Status</td>
            <td className="p-2">:</td>
            <td className="p-2">{isPaid ? "Paid" : "Not Paid Yet"}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        {isPaid ? (
          ""
        ) : (
          <div>
            <button className="m-2 p-2 uppercase bg-cyan-400 hover:bg-cyan-500 rounded-lg text-white text-sm font-semibold">Pay Now</button>
          </div>
        )}
      </div>
    </div>
  );
}

const Color = ({ color }) => {
  return (
    <span
      className={`px-1 rounded-md ${
        color === "black"
          ? "bg-black text-white"
          : color === "blue"
          ? "bg-blue-600 text-white"
          : color === "green"
          ? "bg-green-600 text-white"
          : color === "red"
          ? "bg-red-600 text-white"
          : color === "white"
          ? "bg-white border text-black"
          : ""
      }`}
    >
      {color}
    </span>
  );
};
