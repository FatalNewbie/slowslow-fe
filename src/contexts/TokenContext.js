import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Impob2hhbmh3aUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzE4Njg3Mzg3LCJleHAiOjE3MTg2ODc5ODd9.nvejiaOn8Uv7mSGPYlXJyCrYnBrCEaKa747FSSJmxh8');
  const [userId, setUserId] = useState(16); // userId도 추가

  return (
    <TokenContext.Provider value={{ token, setToken, userId }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
