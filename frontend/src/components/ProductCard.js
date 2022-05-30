import { ShoppingCartIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ img, name, price }) {
  const [buytext, setBuytext] = useState("buy");
  let screenWidth = window.screen.availWidth;

  useEffect(() => {
    if (screenWidth > 365) {
      setBuytext("buy now");
    } else {
      setBuytext("buy");
    }
  }, [screenWidth]);
  return (
    <div className="overflow-hidden w-full rounded-lg shadow-md">
      <div className="overflow-hidden aspect-square w-full">
        <img className="mx-auto" src={img} alt={name} />
      </div>
      <div className="m-3 text-lg font-bold uppercase">{name}</div>
      <div className="m-3 text-lg">Rp. {price}</div>
      <div className="flex m-3 justify-end">
        <Link to="/cart" className="rounded-md bg-cyan-400 p-2 font-semibold uppercase text-neutral-50 hover:scale-105">
          {buytext}
        </Link>
        <Link to="" className="ml-2" href="">
          <ShoppingCartIcon className="w-10 h-10 p-1 rounded-md text-neutral-50 bg-cyan-400 hover:scale-105" />
        </Link>
      </div>
    </div>
  );
}
