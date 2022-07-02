import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

export default function ProductCard({ id, img, name, price }) {
  return (
    <div className="overflow-hidden w-full rounded-lg shadow-md">
      <div className="overflow-hidden aspect-square w-full">
        <img className="mx-auto" src={img} alt={name} />
      </div>
      <div className="m-3 text-lg font-bold uppercase">{name}</div>
      <div className="m-3 text-lg">Rp. {price}</div>
      <div className="flex m-3 justify-end">
        <AddToCart id={id} />
      </div>
    </div>
  );
}
