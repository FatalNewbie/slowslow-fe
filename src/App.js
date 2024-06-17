import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import MainLayout from './layouts/MainLayout';
import ProductDetail from './pages/product/ProductDetail';
import CreateProduct from './pages/product/CreateProduct';
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
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/product" element={<MainLayout />}>
                      <Route index element={<ProductDetail />} />
          </Route>
          <Route path="/product/create" element={<MainLayout />}>
                                <Route index element={<CreateProduct />} />
                    </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
