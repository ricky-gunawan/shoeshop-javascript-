import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, setUserOrders } from "../features/user/userSlice";

export default function OrderBox() {
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.user.userCart);
  const { address, token } = useSelector((store) => store.user.userInfo);
  const [payment, setPayment] = useState("paypal");

  let totalItems = 0;
  let totalPrice = 0;
  items.forEach((product) => {
    totalItems = totalItems + product.quantity;
    totalPrice = totalPrice + toNumber(product.price) * product.quantity;
  });

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const orderDetail = {
        totalItems,
        totalPrice: totalPriceStr(totalPrice.toString()),
        address,
        payment,
      };
      const newOrder = await axios.post("/api/order", { orderDetail }, { headers: { authorization: `Bearer ${token}` } });
      dispatch(setUserOrders(newOrder.data));
      window.location.assign("/orders");
      dispatch(removeCart());
    } catch (error) {
      alert("error, try again later");
    }
  };
  return (
    <div className="border-2 rounded-lg p-1 m-2 h-fit w-full max-h-full">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-fit font-semibold text-lg border-b-4">Order Details</div>
        <table className="">
          <tbody>
            <tr className="">
              <td className="p-2 align-top">Items</td>
              <td className="w-4 p-2 align-top">:</td>
              <td className="p-2 align-top flex flex-wrap gap-2 max-h-[30vh] overflow-auto">
                {items.map((product) => (
                  <div key={product._id} className="flex gap-2 justify-center w-fit border p-1">
                    <div className="mt-1 grow sm:ml-2">
                      <h2 className="text-xs font-bold uppercase">{product.name}</h2>
                      {/* <h3 className="text-xs">
                        Brand: <span className="uppercase">{product.brand}</span>
                      </h3>
                      <h3 className="text-xs">
                        Color: <Color color={product.color} />
                      </h3> */}
                      <h2 className="text-xs my-1 underline">Rp. {product.price}</h2>
                      <h3 className="text-xs">Quantity: {product.quantity}</h3>
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
              <td className="p-2 align-top">Rp. {totalPriceStr(totalPrice.toString())}</td>
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
                <select onChange={handlePayment} value={payment} className="rounded-sm py-1" name="payment" id="payment">
                  <option value="paypal">Paypal</option>
                  <option value="stripe">Stripe</option>
                  <option value="bitcoin">Bitcoin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <input type="submit" value="place an order" className="m-2 p-2 uppercase bg-cyan-400 hover:bg-cyan-500 rounded-lg text-white text-sm font-semibold" />
        </div>
      </form>
    </div>
  );
}

const toNumber = (str) => {
  const newStr = str.replaceAll(".", "");
  return Number(newStr);
};

const totalPriceStr = (s) => {
  const a = s.split("").reverse().join("");
  const b = a.replace(/(.{3})/g, "$1.");
  const c = b.split("").reverse().join("");
  return c.charAt(0) === "." ? c.slice(1) : c;
};
