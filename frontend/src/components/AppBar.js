import { ChevronDownIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";
import NonAdminNav from "./NonAdminNav";

export default function AppBar() {
  const { userInfo, userCart } = useSelector((store) => store.user);

  const isAdmin = userInfo ? userInfo.isAdmin : null;

  let itemQuantity = 0;
  userCart &&
    userCart.items.forEach((item) => {
      itemQuantity = itemQuantity + 1;
    });

  const firstName = userInfo ? userInfo.name.split(" ")[0] : "";

  return (
    <div className="flex fixed z-10 top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-16 px-2 sm:px-6 items-center text-neutral-50 bg-cyan-400">
      <Link to="/" className="flex items-center">
        <img src="/shoeshop.png" width={48} alt="" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop</div>
      </Link>
      <span className="grow"></span>
      {isAdmin ? (
        <div className="group mr-2 h-10 w-fit overflow-clip flex justify-center items-center bg-cyan-400 text-center cursor-pointer">
          <div className="text-white text-xl mr-1 capitalize">Admin</div>
          <ChevronDownIcon className="w-6 h-6 mb-1 pt-2" />
          <div className="hidden group-hover:block absolute top-3/4 right-40 m-1 p-2 border text-black rounded-md bg-neutral-50 cursor-pointer">
            <AdminNav />
          </div>
        </div>
      ) : (
        ""
      )}
      <Link to="/cart" className="relative">
        {userCart && <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-orange-400 rounded-md px-1 text-white">{itemQuantity}</div>}
        <ShoppingCartIcon className="w-6 h-6 text-neutral-50" />
      </Link>
      <div className="group ml-5 h-10 w-fit overflow-clip flex justify-center items-center bg-cyan-400 text-center cursor-pointer">
        {userInfo ? <div className="text-white text-xl mr-1 capitalize">{firstName}</div> : ""}
        <UserCircleIcon className="w-10 h-10 mb-1 bg-cyan-400" />
        <div className="hidden group-hover:block absolute top-3/4 right-4 m-1 p-2 border text-black rounded-md bg-neutral-50 cursor-pointer">
          {userInfo ? (
            <NonAdminNav />
          ) : (
            <a href="/login">
              <div className="hover:bg-slate-200 rounded-md py-1 px-2">Log In</div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
