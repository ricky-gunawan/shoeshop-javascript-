import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";

function App() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
