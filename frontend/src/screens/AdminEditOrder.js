import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { editOrder, getSingleOrder, setOrderForm } from "../features/admin/adminSlice";

export default function AdminEditOrder() {
  const { order, isLoading } = useSelector((store) => store.admin);
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const handleForm = (e) => {
    const elemName = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    dispatch(setOrderForm({ name: elemName, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editOrder(order));
    window.location.assign("/admin/orders");
  };

  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Edit Order</div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-28 mb-10">
          <table className="mx-auto w-full max-w-screen-lg">
            <tbody>
              <tr>
                <td className="w-40">id</td>
                <td>:</td>
                <td>
                  <input
                    value={order._id}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="id"
                    id="admin_order_id"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>user</td>
                <td>:</td>
                <td>
                  <input
                    value={order.user}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="user"
                    id="admin_order_user"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>date</td>
                <td>:</td>
                <td>
                  <input
                    value={order.date}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="date"
                    id="admin_order_date"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>items</td>
                <td>:</td>
                <td className="p-2 align-top flex flex-wrap gap-2 max-h-[30vh] overflow-auto">
                  {order.items.map((product) => (
                    <div key={product._id} className="flex gap-2 justify-center w-fit border p-1">
                      <div className="mt-1 grow sm:ml-2">
                        <h2 className="text-xs font-bold uppercase">{product.name}</h2>
                        <h3 className="text-xs">
                          Brand: <span className="uppercase">{product.brand}</span>
                        </h3>
                        <h3 className="text-xs">
                          Color: <Color color={product.color} />
                        </h3>
                        <h2 className="text-xs my-1 underline">Rp. {product.price}</h2>
                        <h3 className="text-xs">Quantity: {product.quantity}</h3>
                      </div>
                    </div>
                  ))}
                </td>
              </tr>
              <tr>
                <td>total items</td>
                <td>:</td>
                <td>
                  <input
                    value={order.totalItems}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="totalItems"
                    id="admin_order_totalItems"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>total price</td>
                <td>:</td>
                <td>
                  <input
                    value={order.totalPrice}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="totalPrice"
                    id="admin_order_totalPrice"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>address</td>
                <td>:</td>
                <td>
                  <input
                    value={order.address}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="address"
                    id="admin_order_address"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>payment</td>
                <td>:</td>
                <td>
                  <input
                    value={order.payment}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="payment"
                    id="admin_order_payment"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>payment status</td>
                <td>:</td>
                <td>
                  <input
                    value={order.isPaid}
                    checked={order.isPaid}
                    onChange={handleForm}
                    type="checkbox"
                    name="isPaid"
                    id="admin_order_isPaid"
                    className="rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400 align-middle"
                  />
                  <span className="ml-2 align-middle">Set Already Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="save" className="rounded-md uppercase bg-green-500 mx-auto w-40 block text-center mt-8 py-1 cursor-pointer font-semibold text-neutral-50 hover:bg-green-600" />
        </form>
      )}
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
