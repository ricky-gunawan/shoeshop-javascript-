export default function PurchaseBox({ items = "nike model a, puma model b, nike model c, concerse model d, cobacoba coca", total = 100000, address = "jalan lurus tanpa belokan, bandung jawa barat" }) {
  return (
    <div className="border-2 rounded-lg p-1 m-2">
      <div className="mx-auto w-fit font-semibold text-lg border-b-4">Order Details</div>
      <table className="">
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
          <td className="p-2">
            <select className="rounded-sm py-1" name="payment" id="payment">
              <option value="paypal">Paypal</option>
              <option value="stripe">Stripe</option>
              <option value="bitcoin">Bitcoin</option>
            </select>
          </td>
        </tr>
      </table>
      <div className="flex justify-end">
        <button className="m-2 p-2 uppercase bg-cyan-400 hover:bg-cyan-500 rounded-lg text-white text-sm font-semibold">Place an Order</button>
      </div>
    </div>
  );
}
