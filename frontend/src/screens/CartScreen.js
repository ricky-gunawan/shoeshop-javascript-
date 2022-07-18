import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import OrderBox from "../components/OrderBox";
import { setUserCart } from "../features/user/userSlice";

export default function CartScreen() {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const userCart = useSelector((store) => store.user.userCart);

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data } = await axios.get("/api/cart", { headers: { authorization: `Bearer ${userInfo.token}` } });
        data && dispatch(setUserCart(data));
      } catch (error) {
        alert("error, try again!");
        console.log(error);
      }
    };
    getCart();
  });
  return (
    <div className="">
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Cart</div>
      <div className="m-4 mt-28 flex flex-col sm:flex-row gap-2 sm:gap-4">
        {Array.isArray(userCart.items) && userCart.items.length ? (
          <>
            <div className="sm:w-1/2 max-w-lg">
              {userCart.items.map((product) => (
                <CartProduct key={product.product} productId={product.product} name={product.name} img={product.img} price={product.price} brand={product.brand} color={product.color} quantity={product.quantity} />
              ))}
            </div>
            <div className="sm:fixed left-1/2 mx-auto sm:max-h-[80vh] sm:mx-4 max-w-screen-sm">
              <OrderBox />
            </div>
          </>
        ) : (
          <div className="mt-4 mx-auto text-lg">No Product in The Cart</div>
        )}
      </div>
    </div>
  );
}
