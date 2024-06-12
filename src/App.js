import * as React from 'react';
import { ChakraBaseProvider, extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import MainLayout from './layouts/MainLayout';

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const App = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout headerTitle="Home Page" />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ChakraBaseProvider>
  );
};

export default App;
