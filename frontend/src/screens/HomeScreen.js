import Filters from "../components/Filters";
import Products from "../components/Products";

export default function Homescreen() {
  return (
    <div>
      <Filters />
      <div className="lg:ml-48 mt-20 mb-8">
        <Products />
      </div>
    </div>
  );
}
