import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppBar() {
  const [nav, setNav] = useState(false);
  return (
    <div className="flex fixed z-10 top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-16 px-2 sm:px-6 items-center text-neutral-50 bg-cyan-400">
      <Link to="/" className="flex items-center">
        <img src="/shoeshop.png" width={48} alt="" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop</div>
      </Link>
      <span className="grow"></span>
      <Link to="/cart">
        <ShoppingCartIcon className="w-6 h-6 text-neutral-50" />
      </Link>
      <div
        onClick={() => {
          nav ? setNav(false) : setNav(true);
        }}
        className="ml-6 h-10 w-10 overflow-clip flex justify-center items-center bg-cyan-400 rounded-full border-4 border-neutral-50 text-center cursor-pointer"
      >
        <UserIcon className="w-6 h-6 mb-1 bg-cyan-400" />
        <div className={`${nav ? "" : "hidden"} absolute top-full right-4 m-1 p-1 border text-black rounded-md bg-neutral-50 cursor-pointer`}>
          <Link to="/profile">
            <div className="hover:bg-slate-200 rounded-md p-1">Profile</div>
          </Link>
          <Link to="/cart">
            <div className="hover:bg-slate-200 rounded-md p-1">Cart</div>
          </Link>
          <Link to="/orders">
            <div className="hover:bg-slate-200 rounded-md p-1">Orders</div>
          </Link>
          <div className="hover:bg-slate-200 rounded-md p-1">Sign Out</div>
        </div>
      </div>
    </div>
  );
}
