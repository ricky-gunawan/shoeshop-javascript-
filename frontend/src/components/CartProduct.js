export default function CartProduct({ img, name, price, brand, color }) {
  return (
    <div className="flex gap-2 max-w-sm mt-2 overflow-hidden rounded-lg shadow-md p-1">
      <input type="checkbox" className="mt-6 mx-1" name="" id="" />
      <div className="overflow-hidden w-1/2">
        <img className="rounded-lg mt-4" src={img} alt={name} />
      </div>
      <div className="flex flex-col w-1/2 p-1 mt-2 gap-3">
        <h2 className="text-lg xs:text-lg font-bold grow-0 uppercase">{name}</h2>
        <h2 className="text-lg xs:text-lg grow-0">Rp. {price}</h2>
        <h3 className="grow-0 text-xs xs:text-sm">
          Brand: <span className="uppercase">{brand}</span>
        </h3>
        <h3 className="text-xs xs:text-sm grow-0">
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
      </div>
    </div>
  );
}
