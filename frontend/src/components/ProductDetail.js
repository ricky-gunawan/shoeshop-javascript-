import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function ProductDetail({ img, name, price, description }) {
  return (
    <div className="flex flex-col sm:flex-row max-w-screen-lg mx-4 lg:mx-auto overflow-hidden">
      <div className="overflow-hidden sm:w-1/2 w-full">
        <img className="mx-auto rounded-lg" src={img} alt={name} />
      </div>
      <div className="flex flex-col p-4 gap-3 w-full sm:w-1/2">
        <div className="text-xl font-bold grow-0">{name}</div>
        <div className="text-xl grow-0">Rp. {price}</div>
        <p className="text-base grow">{description}</p>
        <div className="flex justify-end grow-0">
          <button className="rounded-md bg-cyan-400 p-2 font-semibold text-neutral-50 hover:scale-105">BUY NOW</button>
          <a className="ml-2" href="">
            <ShoppingCartIcon className="w-10 h-10 p-1 rounded-md text-neutral-50 bg-cyan-400 hover:scale-105" />
          </a>
        </div>
      </div>
    </div>
  );
}
