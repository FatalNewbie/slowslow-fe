import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import Login from './pages/user/Login';
import Main from './pages/user/Main';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
