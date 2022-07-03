import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserCart } from "../features/user/userSlice";

export default function CartProduct({ productId, img, name, price, brand, color, quantity }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((store) => store.user);

  const deleteItem = async (productId) => {
    try {
      const { data } = await axios.patch("/api/cart/delete", { productId }, { headers: { authorization: `Bearer ${userInfo.token}` } });
      data && dispatch(setUserCart(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (increase) => {
    try {
      const { data } = await axios.patch("/api/cart/quantity", { productId, increase }, { headers: { authorization: `Bearer ${userInfo.token}` } });
      data && dispatch(setUserCart(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col mb-2 border-b p-1">
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
        <div>
          <button onClick={() => deleteItem(productId)} className="m-2 p-2 uppercase bg-cyan-400 hover:bg-cyan-500 rounded-lg text-white text-sm font-semibold">
            delete
          </button>
        </div>
      </div>
      <div className="flex text-sm mt-1 justify-around">
        <span className="">Quantity: </span>
        <div className="flex">
          <MinusCircleIcon onClick={() => handleQuantity(false)} width={20} className="mx-2 cursor-pointer" />
          <span>{quantity}</span>
          <PlusCircleIcon onClick={() => handleQuantity(true)} width={20} className="mx-2 cursor-pointer" />
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
