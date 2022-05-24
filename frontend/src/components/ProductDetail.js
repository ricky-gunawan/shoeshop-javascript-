import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function ProductDetail({ img, name, price }) {
  return (
    <div className="flex relative flex-col sm:flex-row m-4 max-w-5xl mx-auto overflow-hidden rounded-lg shadow-md">
      <div className="overflow-hidden sm:w-1/2 w-full">
        <img className="mx-auto" src={img} alt={name} />
      </div>
      <div className="p-6 w-full sm:w-1/2">
        <div className="text-xl font-bold">{name}</div>
        <div className="mt-4 text-xl">Rp. {price}</div>
        <p className="mt-4 mb-12 text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis repellendus excepturi nobis commodi accusantium veniam, magnam alias? Nostrum totam nulla sapiente possimus est error excepturi, velit impedit, sequi laudantium
          numquam!
        </p>
        <div className="m-4 bottom-0 right-0 absolute flex justify-end">
          <button className="rounded-md bg-cyan-400 p-2 font-semibold text-neutral-50 hover:scale-105">BUY NOW</button>
          <a className="ml-2" href="">
            <ShoppingCartIcon className="w-10 h-10 p-1 rounded-md text-neutral-50 bg-cyan-400 hover:scale-105" />
          </a>
        </div>
      </div>
    </div>
  );
}
