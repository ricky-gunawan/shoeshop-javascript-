import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../features/admin/adminSlice";

export default function ProductList({ _id, img, name, price, brand, color, description }) {
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteProduct(_id));
  };

  return (
    <tr className="text-sm border-y text-center">
      <td className="pr-2">{_id}</td>
      <td>
        <img className="rounded-lg my-1" width={80} src={img} alt={name} />
      </td>
      <td className="">{name}</td>
      <td className="">Rp. {price}</td>
      <td className="">{brand}</td>
      <td className="">{color}</td>
      <td className="w-[24rem] text-left pl-4">{description}</td>
      <td className="w-10">
        <button onClick={() => handleDelete(_id)} className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm" title="delete">
          <TrashIcon className="text-red-600" />
        </button>
      </td>
      <td className="w-10">
        <div className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm">
          <Link to={`/admin/products/${_id}`} title="edit">
            <PencilAltIcon className="text-blue-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
