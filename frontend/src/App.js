import AppBar from "./components/AppBar";
import Homescreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <div className="2xl:container mx-auto">
      <AppBar />
      <Homescreen />
      {/* <ProductScreen /> */}
    </div>
  );
}

export default App;
