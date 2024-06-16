import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TokenProvider } from './contexts/TokenContext'; // TokenProvider 임포트

import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import OrderList from './pages/order/OrderList'; // OrderList 임포트
import OrderDetail from './pages/order/OrderDetail'; // OrderDetail 임포트
import OrderPage from './pages/order/OrderPage'; // OrderPage 임포트
import OrderSuccess from './pages/order/OrderSuccess'; // OrderSuccess 임포트
import OrderFailure from './pages/order/OrderFailure'; // OrderFailure 임포트

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/mypage/orders" element={<OrderList />} /> 
          <Route path="/mypage/orders/:orderId" element={<OrderDetail />} /> 
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/orders/success" element={<OrderSuccess />} /> {/* 주문 성공 페이지 경로 추가 */}
          <Route path="/orders/failure" element={<OrderFailure />} /> {/* 주문 실패 페이지 경로 추가 */}
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
