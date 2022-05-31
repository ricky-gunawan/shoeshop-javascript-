import CartProduct from "../components/CartProduct";
import productsTest from "../components/productsTest";
import OrderBox from "../components/OrderBox";

const product5 = productsTest.slice(0, 5);
export default function CartScreen() {
  return (
    <div className="flex flex-col sm:flex-row mt-20 m-4 gap-2 sm:gap-4">
      <div className="sm:w-1/2 max-w-lg">
        {product5.map((product) => (
          <CartProduct key={product._id} name={product.name} img={product.img} price={product.price} brand={product.brand} color={product.color} />
        ))}
      </div>
      <div className="sm:fixed left-1/2 mx-auto h-fit sm:ml-4 max-w-sm">
        <OrderBox />
      </div>
    </div>
  );
}
