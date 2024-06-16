import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Impob2hhbmh3aUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzE4NTE5NDIyLCJleHAiOjE3MTg1MjAwMjJ9.ge-j3y7MTPD7nvPeQAVCNa8ZjJItOSYab3olKEgTZsU');

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
