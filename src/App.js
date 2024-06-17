import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TokenProvider } from './contexts/TokenContext'; // TokenProvider 임포트

import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import OrderList from './pages/order/OrderList'; // OrderList 임포트
import OrderDetail from './pages/order/OrderDetail'; // OrderDetail 임포트
import OrderPage from './pages/order/OrderPage'; // OrderPage 임포트
import OrderSuccess from './pages/order/OrderSuccess'; // OrderSuccess 임포트
import OrderFailure from './pages/order/OrderFailure'; // OrderFailure 임포트
import MainLayout from './layouts/MainLayout';
import './index.css'; // CSS 파일 임포트

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // 커스터마이징 옵션 추가
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TokenProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/mypage/orders" element={<OrderList />} /> 
              <Route path="/mypage/orders/:orderId" element={<OrderDetail />} /> 
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/orders/success" element={<OrderSuccess />} /> {/* 주문 성공 페이지 경로 추가 */}
              <Route path="/orders/failure" element={<OrderFailure />} /> {/* 주문 실패 페이지 경로 추가 */}
            </Route>
          </Routes>
        </Router>
      </TokenProvider>
    </ThemeProvider>
  );
};

export default App;
