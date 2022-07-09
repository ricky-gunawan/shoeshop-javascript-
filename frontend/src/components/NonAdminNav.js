import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../features/user/userSlice";

export default function NonAdminNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate("/");
  };
  return (
    <>
      <a href="/profile">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Profile</div>
      </a>
      <a href="/cart">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Cart</div>
      </a>
      <a href="/orders">
        <div className="hover:bg-slate-200 rounded-md py-1 px-2">Orders</div>
      </a>
      <div onClick={handleLogOut} className="hover:bg-slate-200 rounded-md py-1 px-2">
        Log Out
      </div>
    </>
  );
}
