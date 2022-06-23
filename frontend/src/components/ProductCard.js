import { Link } from "react-router-dom";

export default function ProductCard({ img, name, price }) {
  return (
    <div className="overflow-hidden w-full rounded-lg shadow-md">
      <div className="overflow-hidden aspect-square w-full">
        <img className="mx-auto" src={img} alt={name} />
      </div>
      <div className="m-3 text-lg font-bold uppercase">{name}</div>
      <div className="m-3 text-lg">Rp. {price}</div>
      <div className="flex m-3 justify-end">
        <Link to="/cart" className="rounded-md bg-cyan-400 p-2 font-semibold uppercase text-neutral-50 active:bg-cyan-500">
          add to cart
        </Link>
      </div>
    </div>
  );
}
