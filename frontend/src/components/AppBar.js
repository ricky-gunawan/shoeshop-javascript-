import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <div className="flex fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-16 px-2 sm:px-6 items-center text-neutral-50 bg-cyan-400">
      <Link to="/" className="flex items-center">
        <img src="/shoeshop.png" width={48} alt="" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop</div>
      </Link>
      <span className="grow"></span>
      <Link to="/cart">
        <ShoppingCartIcon className="w-6 h-6 text-neutral-50" />
      </Link>
      <Link to="/profile" className="ml-6 h-10 w-10 overflow-clip flex justify-center items-center bg-cyan-400 rounded-full border-4 border-neutral-50 text-center">
        <UserIcon className="w-6 h-6 mb-1 bg-cyan-400" />
      </Link>
    </div>
  );
}
