import CartProduct from "../components/CartProduct";
import productsTest from "../components/productsTest";

const product5 = productsTest.slice(0, 5);
export default function CartScreen() {
  return (
    <div className="mt-20 m-4">
      {product5.map((product) => (
        <CartProduct key={product.img} name={product.name} img={product.img} price={product.price} brand={product.brand} color={product.color} />
      ))}
    </div>
  );
}
