import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import Homescreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto max-w-screen-2xl">
        <AppBar />
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/product" element={<ProductScreen />}>
            <Route path=":productId" element={<ProductScreen />} />
          </Route>
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center">
                <p>Tidak ada apa apa disini kawan</p>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
