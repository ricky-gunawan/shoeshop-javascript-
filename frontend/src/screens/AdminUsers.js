import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import UserList from "../components/UserList";
import { getAllUsers } from "../features/admin/adminSlice";

export default function AdminUsers() {
  const { isLoading, users } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  let num = 0;
  users &&
    users.forEach(() => {
      num = num + 1;
    });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div>
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">Manage Users</div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-28 w-fit mx-auto">
          <div>Total: {num}</div>
          <table>
            <thead className="text-center border-y-2">
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>address</th>
                <th>isAdmin</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, address, isAdmin }) => (
                <UserList key={_id} _id={_id} name={name} email={email} address={address} isAdmin={isAdmin} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
