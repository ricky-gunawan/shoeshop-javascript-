import { useState } from "react";

const menuOpen = (
  <div className="w-4 py-1 m-2">
    <div className="-translate-y-full border-t-4"></div>
    <div className="border-t-4"></div>
    <div className="translate-y-full border-t-4"></div>
  </div>
);
const menuClose = (
  <div className="w-4 py-1 m-2">
    <div className="translate-y-1/2 rotate-45 border-t-4"></div>
    <div className="-translate-y-1/2 -rotate-45 border-t-4"></div>
  </div>
);

export default function Filters() {
  const [filters, setFilters] = useState(false);

  return (
    <div>
      <div className={`fixed mt-20 rounded-r-lg top-0 w-48 bg-black/50 transition-transform duration-500 lg:translate-x-0 ${filters ? "" : "-translate-x-full"} z-20 border-r-4 border-cyan-400 lg:bg-slate-300`}>
        <button onClick={() => (filters ? setFilters(false) : setFilters(true))} className="absolute right-0 top-0 mt-2 -mr-2 translate-x-full rounded-md lg:hidden bg-cyan-400/50 text-neutral-50/50">
          {filters ? menuClose : menuOpen}
        </button>
        <div className="m-2">
          <span className="mx-auto block w-fit text-lg font-bold">Filters</span>
          <hr className="border border-black" />
          <form action="">
            <div className="flex flex-col">
              <span className="font-semibold m-2">Brand :</span>
              <div className="flex flex-col ml-6">
                <label className="flex items-center" htmlFor="adidas">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="adidas" />
                  <span className="ml-2">Adidas</span>
                </label>
                <label className="flex items-center" htmlFor="converse">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="converse" />
                  <span className="ml-2">Converse</span>
                </label>
                <label className="flex items-center" htmlFor="new_balance">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="new_balance" />
                  <span className="ml-2">New Balance</span>
                </label>
                <label className="flex items-center" htmlFor="nike">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="nike" />
                  <span className="ml-2">Nike</span>
                </label>
                <label className="flex items-center" htmlFor="puma">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="puma" />
                  <span className="ml-2">Puma</span>
                </label>
                <label className="flex items-center" htmlFor="reebok">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="reebok" />
                  <span className="ml-2">Reebok</span>
                </label>
                <label className="flex items-center" htmlFor="vans">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="vans" />
                  <span className="ml-2">Vans</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold m-2">Color :</span>
              <div className="flex flex-col ml-6">
                <label className="flex items-center" htmlFor="black">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="black" />
                  <span className="ml-2">Black</span>
                </label>
                <label className="flex items-center" htmlFor="white">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="white" />
                  <span className="ml-2">White</span>
                </label>
                <label className="flex items-center" htmlFor="red">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="red" />
                  <span className="ml-2">Red</span>
                </label>
                <label className="flex items-center" htmlFor="blue">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="blue" />
                  <span className="ml-2">Blue</span>
                </label>
                <label className="flex items-center" htmlFor="green">
                  <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="green" />
                  <span className="ml-2">Green</span>
                </label>
              </div>
            </div>
            <a href="" className="flex justify-end">
              <span className=" rounded-md bg-cyan-400 m-1 mt-2 px-2 py-1 font-semibold text-neutral-50 hover:scale-105">Submit</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
