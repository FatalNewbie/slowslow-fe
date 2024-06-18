import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TokenProvider } from './contexts/TokenContext'; // TokenProvider 임포트

import MainLayout from './layouts/MainLayout';
import Cart from './pages/cart/Cart';
import CartOrder from './pages/cart/CartOrder.jsx';
import Order from './pages/order/Order';
import OrderList from './pages/order/OrderList'; // OrderList 임포트
import OrderDetail from './pages/order/OrderDetail'; // OrderDetail 임포트
import OrderPage from './pages/order/OrderPage'; // OrderPage 임포트
import OrderSuccess from './pages/order/OrderSuccess'; // OrderSuccess 임포트
import OrderFailure from './pages/order/OrderFailure'; // OrderFailure 임포트
import Home from './pages/home/Home';
import Brand from './pages/brand/Brand';
import BrandPage from './pages/brand/BrandPage';
import BrandAdmin from './pages/admin/BrandAdmin';
import Category from './pages/category/Category';
import CategoryPage from './pages/category/CategoryPage';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import ProductDetail from './pages/product/ProductDetail.jsx';
import ProductAdmin from './pages/admin/ProductAdmin.jsx';
import AdminOrder from './pages/admin/order/AdminOrder.jsx';
import Login from './pages/user/Login';
import Main from './pages/user/Main';
import Membership from './pages/user/Membership';
import MyPage from './pages/user/MyPage';

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
                            <Route path="/cart/order" element={<CartOrder />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/orders" element={<OrderPage />} />
                            <Route path="/orders/success" element={<OrderSuccess />} />
                            <Route path="/orders/failure" element={<OrderFailure />} />
                            <Route path="/mypage/orders" element={<OrderList />} />
                            <Route path="/mypage/orders/:orderId" element={<OrderDetail />} />
                            <Route path="/brand" element={<Brand />} />
                            <Route path="/brand/:id" element={<BrandPage />} />
                            <Route path="/admin/brand" element={<BrandAdmin />} />
                            <Route path="/category" element={<Category />} />
                            <Route path="/category/:id" element={<CategoryPage />} />
                            <Route path="/admin/category" element={<CategoryAdmin />} />
                            <Route path="/admin/order" element={<AdminOrder />} />
                            <Route path="/product/:productId" element={<ProductDetail />} />
                            <Route path="/admin/product" element={<ProductAdmin />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/main" element={<Main />} />
                            <Route path="/membership" element={<Membership />} />
                            <Route path="/mypage" element={<MyPage />} />
                        </Route>
                    </Routes>
                </Router>
            </TokenProvider>
        </ThemeProvider>
    );
};

export default App;
