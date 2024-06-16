import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TokenProvider } from './contexts/TokenContext'; // TokenProvider 임포트

import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import OrderList from './pages/order/OrderList'; // OrderList 임포트
import OrderDetail from './pages/order/OrderDetail'; // OrderDetail 임포트

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/mypage/orders" element={<OrderList />} /> {/* 새로운 경로 추가 */}
          <Route path="/mypage/orders/:orderId" element={<OrderDetail />} /> {/* 주문 상세 조회 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
