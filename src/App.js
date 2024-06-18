import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from './pages/cart/Cart';
import CartOrder from './pages/cart/CartOrder.jsx';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import AdminOrder from './pages/admin/order/AdminOrder.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<CartOrder />} />
                <Route path="/admin/order" element={<AdminOrder />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
