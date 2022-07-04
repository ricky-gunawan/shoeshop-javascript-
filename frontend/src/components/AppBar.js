import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../features/user/userSlice";

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, userCart } = useSelector((store) => store.user);

  let itemQuantity = 0;
  userCart &&
    userCart.items.forEach((item) => {
      itemQuantity = itemQuantity + 1;
    });

  const firstName = userInfo ? userInfo.name.split(" ")[0] : "";

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className="flex fixed z-10 top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-16 px-2 sm:px-6 items-center text-neutral-50 bg-cyan-400">
      <Link to="/" className="flex items-center">
        <img src="/shoeshop.png" width={48} alt="" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop</div>
      </Link>
      <span className="grow"></span>
      <Link to="/cart" className="relative">
        {userCart && <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-md px-1 text-white">{itemQuantity}</div>}
        <ShoppingCartIcon className="w-6 h-6 text-neutral-50" />
      </Link>
      <div className="group ml-5 h-10 w-fit overflow-clip flex justify-center items-center bg-cyan-400 text-center cursor-pointer">
        {userInfo ? <div className="text-white text-xl mr-1 capitalize">{firstName}</div> : ""}
        <UserCircleIcon className="w-10 h-10 mb-1 bg-cyan-400" />
        {userInfo ? (
          <div className="hidden group-hover:block absolute top-3/4 m-1 right-4 p-2 border text-black rounded-md bg-neutral-50 cursor-pointer">
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
          </div>
        ) : (
          <div className="hidden group-hover:block absolute top-3/4 m-1 right-4 p-2 border text-black rounded-md bg-neutral-50 cursor-pointer">
            <a href="/login">
              <div className="hover:bg-slate-200 rounded-md py-1 px-2">Log In</div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
