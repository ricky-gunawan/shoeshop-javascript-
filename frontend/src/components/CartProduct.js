import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";

export default function CartProduct({ img, name, price, brand, color, qty = 2 }) {
  return (
    <div className="flex flex-col mb-2 border-t p-1">
      <div className="flex gap-2 justify-center">
        <div className="overflow-hidden grow-0">
          <img className="rounded-lg my-1 sm:ml-4" width={100} src={img} alt={name} />
        </div>
        <div className="mt-1 grow sm:ml-2">
          <h2 className="text-base font-semibold uppercase">{name}</h2>
          <h3 className="text-xs">
            Brand: <span className="uppercase">{brand}</span>
          </h3>
          <h3 className="text-xs">
            Color: <Color color={color} />
          </h3>
          <h2 className="text-md my-1 underline">Rp. {price}</h2>
        </div>
      </div>
      <div className="flex text-sm mt-1 justify-around">
        <span className="">Quantity: </span>
        <div className="flex">
          <MinusCircleIcon width={20} className="mx-2 cursor-pointer" />
          <span>{qty}</span>
          <PlusCircleIcon width={20} className="mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

const Color = ({ color }) => {
  return (
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
  );
};
