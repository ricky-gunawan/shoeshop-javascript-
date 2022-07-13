import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../features/admin/adminSlice";

export default function UserList({ _id, name, email, address, isAdmin }) {
  const dispatch = useDispatch();

  const handleDelete = (_id) => {
    dispatch(deleteUser(_id));
  };

  return (
    <tr className="text-sm border-y text-center">
      <td className="px-4">{_id}</td>
      <td className="px-4">{name}</td>
      <td className="px-4">{email}</td>
      <td className="px-4">{address}</td>
      <td className="px-4">{isAdmin ? "True" : "False"}</td>
      <td className="w-10 pl-4">
        <button onClick={() => handleDelete(_id)} className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm" title="delete">
          <TrashIcon className="text-red-600" />
        </button>
      </td>
      <td className="w-10">
        <div className="active:bg-black/10 w-8 mx-auto p-1 rounded-sm">
          <Link to={`/admin/users/${_id}`} title="edit">
            <PencilAltIcon className="text-blue-500" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
