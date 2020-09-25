import React, { createContext, useState } from 'react';

export const MainContext = createContext(null);

MainContext.displayName = 'MainContext';

const MainProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  const context = {
    products,
    setProducts,
    carts,
    setCarts,
  };

  return <MainContext.Provider value={context}>{children}</MainContext.Provider>;
};

export default MainProvider;
