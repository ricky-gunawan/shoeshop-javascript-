import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder } from "../features/admin/adminSlice";

export default function OrderList({ _id, user, date, items, totalItems, totalPrice, address, payment, isPaid }) {
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteOrder(_id));
  };

  return (
    <tr className="text-sm border-y text-center">
      <td className="px-4">{_id}</td>
      <td className="px-4">{user}</td>
      <td className="px-4">{date}</td>
      {/* <td className="px-4">
        {items.map((item) => (
          <div key={item._id}>{item}</div>
        ))}
      </td> */}
      <td className="px-4">{totalItems}</td>
      <td className="px-4">{totalPrice}</td>
      <td className="px-4">{address}</td>
      <td className="px-4">{payment}</td>
      <td className="px-4">{isPaid ? "Paid" : "Not Paid"}</td>
      <td className="w-10 pl-4">
        <button onClick={() => handleDelete(_id)} className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm" title="delete">
          <TrashIcon className="text-red-600" />
        </button>
      </td>
      <td className="w-10">
        <div className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm">
          <Link to={`/admin/orders/${_id}`} title="edit">
            <PencilAltIcon className="text-blue-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
