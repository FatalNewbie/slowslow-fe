import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Impob2hhbmh3aUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzE4Njk3OTE0LCJleHAiOjE3MTg2OTg1MTR9.YdsxM_z2F55a_PnFFBc2DAt_PrVJ6VDRyKSdUAx4ukY');
  const [userId, setUserId] = useState(16); // userId도 추가

  return (
    <TokenContext.Provider value={{ token, setToken, userId }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
