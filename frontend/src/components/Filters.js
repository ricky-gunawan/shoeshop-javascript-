import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setBrand, setColor } from "../features/products/productsSlice";

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
  const brand = useSelector((store) => store.products.brand);
  const color = useSelector((store) => store.products.color);
  const dispatch = useDispatch();

  const [openfilters, setOpenFilters] = useState(false);
  // const [brand, setBrand] = useState("all");
  // const [color, setColor] = useState("all");

  const handleBrandChange = (event) => {
    // setBrand(event.target.value);
    dispatch(setBrand(event.target.value));
  };
  const handleColorChange = (event) => {
    // setColor(event.target.value);
    dispatch(setColor(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getProducts(`/api/products/search?brand=${brand}&color=${color}`));
  };

  return (
    <div
      className={`fixed mt-20 rounded-r-lg top-0 w-48 bg-black/50 text-neutral-50 transition-transform duration-500 ${openfilters ? "" : "-translate-x-full"} lg:translate-x-0 z-20 border-r-4 border-cyan-400 lg:bg-gray-200 lg:text-black`}
    >
      <button onClick={() => (openfilters ? setOpenFilters(false) : setOpenFilters(true))} className="absolute right-0 top-0 mt-2 -mr-2 translate-x-full rounded-md lg:hidden bg-cyan-400/50 text-neutral-50/50">
        {openfilters ? menuClose : menuOpen}
      </button>
      <div className="m-2">
        <span className="mx-auto block w-fit text-lg font-bold">Filters</span>
        <hr className="border lg:border-gray-500 border-neutral-200" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <span className="font-semibold m-2">Brand :</span>
            <div className="flex flex-col ml-6">
              <label className="flex items-center" htmlFor="adidas">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="all" onChange={handleBrandChange} value="all" checked={brand === "all"} />
                <span className="ml-2">All</span>
              </label>
              <label className="flex items-center" htmlFor="adidas">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="adidas" onChange={handleBrandChange} value="adidas" checked={brand === "adidas"} />
                <span className="ml-2">Adidas</span>
              </label>
              <label className="flex items-center" htmlFor="converse">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="converse" onChange={handleBrandChange} value="converse" checked={brand === "converse"} />
                <span className="ml-2">Converse</span>
              </label>
              <label className="flex items-center" htmlFor="new_balance">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="new_balance" onChange={handleBrandChange} value="new_balance" checked={brand === "new_balance"} />
                <span className="ml-2">New Balance</span>
              </label>
              <label className="flex items-center" htmlFor="nike">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="nike" onChange={handleBrandChange} value="nike" checked={brand === "nike"} />
                <span className="ml-2">Nike</span>
              </label>
              <label className="flex items-center" htmlFor="puma">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="puma" onChange={handleBrandChange} value="puma" checked={brand === "puma"} />
                <span className="ml-2">Puma</span>
              </label>
              <label className="flex items-center" htmlFor="reebok">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="reebok" onChange={handleBrandChange} value="reebok" checked={brand === "reebok"} />
                <span className="ml-2">Reebok</span>
              </label>
              <label className="flex items-center" htmlFor="vans">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="brand" id="vans" onChange={handleBrandChange} value="vans" checked={brand === "vans"} />
                <span className="ml-2">Vans</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold m-2">Color :</span>
            <div className="flex flex-col ml-6">
              <label className="flex items-center" htmlFor="black">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="all" onChange={handleColorChange} value="all" checked={color === "all"} />
                <span className="ml-2">All</span>
              </label>
              <label className="flex items-center" htmlFor="black">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="black" onChange={handleColorChange} value="black" checked={color === "black"} />
                <span className="ml-2">Black</span>
              </label>
              <label className="flex items-center" htmlFor="white">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="white" onChange={handleColorChange} value="white" checked={color === "white"} />
                <span className="ml-2">White</span>
              </label>
              <label className="flex items-center" htmlFor="red">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="red" onChange={handleColorChange} value="red" checked={color === "red"} />
                <span className="ml-2">Red</span>
              </label>
              <label className="flex items-center" htmlFor="blue">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="blue" onChange={handleColorChange} value="blue" checked={color === "blue"} />
                <span className="ml-2">Blue</span>
              </label>
              <label className="flex items-center" htmlFor="green">
                <input className="rounded-md text-cyan-400 focus:ring-1 focus:ring-cyan-400" type="radio" name="color" id="green" onChange={handleColorChange} value="green" checked={color === "green"} />
                <span className="ml-2">Green</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <input type="submit" className="cursor-pointer rounded-md bg-cyan-400 m-1 mt-2 px-2 py-1 font-semibold text-neutral-50 active:bg-cyan-500" value="Filter" />
          </div>
        </form>
      </div>
    </div>
  );
}
