import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

export default function ProductDetail({ img, name, price, brand, color, description }) {
  return (
    <div className="flex flex-col sm:flex-row max-w-screen-lg mx-4 lg:mx-auto overflow-hidden">
      <div className="overflow-hidden sm:w-1/2 w-full">
        <img className="mx-auto rounded-lg" width={352} src={img} alt={name} />
      </div>
      <div className="flex flex-col p-4 gap-3 w-full sm:w-1/2">
        <h2 className="text-xl font-bold grow-0 uppercase">{name}</h2>
        <h2 className="text-xl grow-0">Rp. {price}</h2>
        <h3 className="text-sm grow-0">
          Brand: <span className="uppercase">{brand}</span>
        </h3>
        <h3 className="text-sm grow-0">
          Color:{" "}
          <span
            className={`px-1 rounded-md ${
              color === "black"
                ? "bg-black text-white"
                : color === "blue"
                ? "bg-blue-600 text-white"
                : color === "green"
                ? "bg-green-600 text-white"
                : color === "red"
                ? "bg-red-600 text-white"
                : color === "white"
                ? "bg-white border text-black"
                : ""
            }`}
          >
            {color}
          </span>
        </h3>
        <p className="text-base grow">{description}</p>
        <div className="flex justify-end grow-0">
          <Link to="/cart" className="rounded-md uppercase bg-cyan-400 p-2 font-semibold text-neutral-50 hover:bg-cyan-500">
            add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
