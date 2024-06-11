import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
