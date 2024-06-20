import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, BrowserRouter } from 'react-router-dom';
import { TokenProvider } from './contexts/TokenContext'; // TokenProvider 임포트
import MainLayout from './layouts/MainLayout';
import BrandLayout from './layouts/BrandLayout.jsx';
import CategoryLayout from './layouts/CategoryLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import OrderList from './pages/order/OrderList'; // OrderList 임포트
import OrderDetail from './pages/order/OrderDetail'; // OrderDetail 임포트
import OrderPage from './pages/order/OrderPage'; // OrderPage 임포트
import OrderSuccess from './pages/order/OrderSuccess'; // OrderSuccess 임포트
import OrderFailure from './pages/order/OrderFailure'; // OrderFailure 임포트
import Home from './pages/home/Home';
import BrandAdmin from './pages/admin/BrandAdmin';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import ProductDetail from './pages/product/ProductDetail.jsx';
import ProductAdmin from './pages/admin/ProductAdmin.jsx';
import AdminOrder from './pages/admin/order/AdminOrder.jsx';

import Login from './pages/user/Login';
import Main from './pages/user/Main';
import Membership from './pages/user/Membership';
import AdminHome from './pages/admin/AdminHome.jsx';
import MyPage from './pages/user/MyPage';
import CheckPassword from './pages/user/CheckPassword.jsx';
import Update from './pages/user/Update.jsx';
import './index.css'; // CSS 파일 임포트
import { AuthProvider } from './pages/user/AuthContext'; //로그인 전역 설정
import { AuthContext } from './pages/user/AuthContext';
import { useContext, useEffect } from 'react';
import BrandMainPage from './pages/brand/BrandMainPage.jsx';
import CategoryMainPage from './pages/category/CategoryMainPage.jsx';
import DeleteUser from './pages/user/DeleteUser.jsx';
import UserAdmin from './pages/admin/UserAdmin.jsx';

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
    const { isLoggedIn, role, username } = useContext(AuthContext);

    console.log(isLoggedIn);

    console.log('사용자 아이디 ' + username);

    console.log('사용자 권한 ' + role);

    const admin = localStorage.getItem('role');

    useEffect(() => {
        // 모든 페이지가 렌더링된 후 실행되는 코드
        console.log('App 컴포넌트가 마운트되었습니다.');
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/orders/success" element={<OrderSuccess />} />
                        <Route path="/orders/failure" element={<OrderFailure />} />
                        <Route path="/mypage/orders" element={<OrderList />} />
                        <Route path="/mypage/orders/:orderId" element={<OrderDetail />} />
                        <Route path="/brand" element={<BrandLayout />}>
                            <Route path="/brand" element={<BrandMainPage />} />
                            <Route path="/brand/:id" element={<BrandMainPage />} />
                        </Route>
                        <Route path="/category" element={<CategoryLayout />}>
                            <Route path="/category" element={<CategoryMainPage />} />
                            <Route path="/category/:id" element={<CategoryMainPage />} />
                        </Route>
                        <Route path="/product/:productId" element={<ProductDetail />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/checkPassword" element={<CheckPassword />} />
                        <Route path="/update" element={<Update />} />
                        <Route path="/deleteUser" element={<DeleteUser />} />
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
                        <Route path="/membership" element={isLoggedIn ? <Navigate to="/" replace /> : <Membership />} />

                        {/* <Route path="/checkPassword" element={<MainLayout />}>
                            <Route index element={<CheckPassword />} />
                        </Route>
                        <Route path="/update" element={<MainLayout />}>
                            <Route index element={<Update />} />
                        </Route> */}
                    </Route>
                    <Route
                        path="/admin"
                        element={admin === 'ROLE_ADMIN' ? <AdminLayout /> : <Navigate to="/" replace />}
                    >
                        <Route index element={<AdminHome />} />
                        <Route path="/admin/brand" element={<BrandAdmin />} />
                        <Route path="/admin/category" element={<CategoryAdmin />} />
                        <Route path="/admin/order" element={<AdminOrder />} />
                        <Route path="/admin/product" element={<ProductAdmin />} />
                        <Route path="/admin/userList" element={<UserAdmin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
