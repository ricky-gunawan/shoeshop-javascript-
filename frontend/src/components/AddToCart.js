import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserCart } from "../features/user/userSlice";

export default function AddToCart({ id }) {
  const { userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const addToCart = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch("/api/cart", { userId: userInfo.id, productId: id });
      data && dispatch(setUserCart(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button onClick={(e) => addToCart(e, id)} className="rounded-md uppercase bg-cyan-400 p-2 font-semibold text-neutral-50 hover:bg-cyan-500">
      add to cart
    </button>
  );
}
