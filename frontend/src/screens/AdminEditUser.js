import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { getSingleUser, setUserForm } from "../features/admin/adminSlice";

export default function AdminEditUser() {
  const { user, isLoading } = useSelector((store) => store.admin);
  const { userId } = useParams();
  const dispatch = useDispatch();

  const handleForm = (e) => {
    const elemName = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    dispatch(setUserForm({ name: elemName, value }));
  };

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Edit User</div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form className="mt-28">
          <table className="mx-auto w-full max-w-screen-lg">
            <tbody>
              <tr>
                <td className="w-40">id</td>
                <td>:</td>
                <td>
                  <input value={user._id} onChange={handleForm} disabled type="text" name="id" id="admin_user_id" className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400" />
                </td>
              </tr>
              <tr>
                <td>name</td>
                <td>:</td>
                <td>
                  <input
                    value={user.name}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="name"
                    id="admin_user_name"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>email</td>
                <td>:</td>
                <td>
                  <input
                    value={user.email}
                    onChange={handleForm}
                    disabled
                    type="text"
                    name="email"
                    id="admin_user_email"
                    className="w-full my-2 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td>address</td>
                <td>:</td>
                <td>
                  <textarea
                    value={user.address}
                    onChange={handleForm}
                    disabled
                    name="address"
                    id="admin_user_address"
                    className="w-full my-2 h-20 rounded-sm border disabled:bg-slate-200 border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <input
                    value={user.isAdmin}
                    checked={user.isAdmin}
                    onChange={handleForm}
                    type="checkbox"
                    name="isAdmin"
                    id="admin_user_isAdmin"
                    className="rounded-sm border border-slate-300 focus:border-cyan-400 focus:ring-cyan-400 align-middle"
                  />
                  <span className="ml-2 align-middle">Set as Admin</span>
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
