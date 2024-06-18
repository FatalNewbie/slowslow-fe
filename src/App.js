import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Home from './pages/home/Home';
import Brand from './pages/brand/Brand';
import BrandPage from './pages/brand/BrandPage';
import BrandAdmin from './pages/admin/BrandAdmin';
import Category from './pages/category/Category';
import CategoryPage from './pages/category/CategoryPage';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import CartOrder from './pages/cart/CartOrder.jsx';
import AdminOrder from './pages/admin/order/AdminOrder.jsx';

import './index.css'; // CSS 파일 임포트

import Login from './pages/user/Login';
import Main from './pages/user/Main';
import Membership from './pages/user/Membership';
import MyPage from './pages/user/MyPage';

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
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/cart" element={<MainLayout />}>
                        <Route index element={<Cart />} />
                    </Route>
                    <Route path="/cart/order" element={<MainLayout />}>
                        <Route index element={<CartOrder />} />
                    </Route>
                    <Route path="/order" element={<MainLayout />}>
                        <Route index element={<Order />} />
                    </Route>
                    <Route path="/brand" element={<MainLayout />}>
                        <Route index element={<Brand />} />
                    </Route>
                    <Route path="/brand/:id" element={<MainLayout />}>
                        <Route index element={<BrandPage />} />
                    </Route>
                    <Route path="/admin/brand" element={<MainLayout />}>
                        <Route index element={<BrandAdmin />} />
                    </Route>
                    <Route path="/category" element={<MainLayout />}>
                        <Route index element={<Category />} />
                    </Route>
                    <Route path="/category/:id" element={<MainLayout />}>
                        <Route index element={<CategoryPage />} />
                    </Route>
                    <Route path="/admin/category" element={<MainLayout />}>
                        <Route index element={<CategoryAdmin />} />
                    </Route>
                    <Route path="/admin/order" element={<MainLayout />}>
                        <Route index element={<AdminOrder />} />
                    </Route>
                    <Route path="/login" element={<MainLayout />}>
                        <Route index element={<Login />} />
                    </Route>
                    <Route path="/main" element={<MainLayout />}>
                        <Route index element={<Main />} />
                    </Route>
                    <Route path="/membership" element={<MainLayout />}>
                        <Route index element={<Membership />} />
                    </Route>
                    <Route path="/mypage" element={<MainLayout />}>
                        <Route index element={<MyPage />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
