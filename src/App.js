import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import Home from "./pages/home/Home";
import Brand from "./pages/brand/Brand";
import BrandPage from './pages/brand/BrandPage';
import BrandAdmin from "./pages/brand/BrandAdmin";
import Category from "./pages/category/Category";
import CategoryPage from "./pages/category/CategoryPage";
import CategoryAdmin from "./pages/category/CategoryListAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/brand/:id" element={<BrandPage />} />
        <Route path="/brand/admin" element={<BrandAdmin />} />
        <Route path="/category" element={<Category />} /> 
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/category/admin" element={<CategoryAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
