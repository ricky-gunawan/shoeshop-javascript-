import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import OrderBox from "../components/OrderBox";
import LoginScreen from "./LoginScreen";

export default function CartScreen() {
  const userCart = useSelector((store) => store.user.userCart);

  return (
    <>
      {userCart ? (
        <div className="">
          <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Cart</div>
          <div className="m-4 mt-28 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="sm:w-1/2 max-w-lg">
              {userCart.items.map((product) => (
                <CartProduct key={product.product} productId={product.product} name={product.name} img={product.img} price={product.price} brand={product.brand} color={product.color} quantity={product.quantity} />
              ))}
            </div>
            <div className="sm:fixed left-1/2 mx-auto sm:max-h-[80vh] sm:mx-4 max-w-screen-sm">
              <OrderBox />
            </div>
          </div>
        </div>
      ) : (
        <LoginScreen />
      )}
    </>
  );
}
