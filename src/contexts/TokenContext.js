import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Impob2hhbmh3aUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzE4NjE4NDgyLCJleHAiOjE3MTg2MTkwODJ9.9EmWBVRhbrOSUyNGiL6adntwdez_6C8SkoMxNvMHr64');
  const [userId, setUserId] = useState(16); // userId도 추가

  return (
    <TokenContext.Provider value={{ token, setToken, userId }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
