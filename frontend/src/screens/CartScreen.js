import CartProduct from "../components/CartProduct";
import OrderBox from "../components/OrderBox";
import productsTest from "../components/productsTest";

const product5 = productsTest.slice(0, 5);
export default function CartScreen() {
  return (
    <div className="">
      <div className="text-center border-b-2 text-xl font-bold fixed p-2 top-16 w-full h-fit bg-white">My Cart</div>
      <div className="m-4 mt-28 flex flex-col sm:flex-row gap-2 sm:gap-4">
        <div className="sm:w-1/2 max-w-lg">
          {product5.map((product) => (
            <CartProduct key={product._id} name={product.name} img={product.img} price={product.price} brand={product.brand} color={product.color} />
          ))}
        </div>
        <div className="sm:fixed left-1/2 mx-auto h-fit sm:ml-4 max-w-sm">
          <OrderBox />
        </div>
      </div>
    </div>
  );
}
