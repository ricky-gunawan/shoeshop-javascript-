import { ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";

export default function AppBar() {
  return (
    <div className="flex h-16 px-2 sm:px-6 items-center text-neutral-50 bg-cyan-400">
      <a href="" className="flex grow items-center">
        <img src={require("./../assets/shoeshop.png")} width={48} alt="" />
        <div className="ml-2 text-xl font-extrabold">Shoeshop</div>
      </a>
      <a href="">
        <ShoppingCartIcon className="w-6 h-6 text-neutral-50" />
      </a>
      <a href="" className="ml-6 h-10 w-10 overflow-clip flex justify-center items-center bg-cyan-400 rounded-full border-4 border-neutral-50 text-center">
        <UserIcon className="w-6 h-6 mb-1 bg-cyan-400" />
      </a>
    </div>
  );
}
