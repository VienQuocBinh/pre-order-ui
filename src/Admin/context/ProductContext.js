import React, { createContext, useContext } from 'react';
import useProduct from '../hooks/useProduct';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const productMethods = useProduct();

  return (
    <ProductContext.Provider value={productMethods}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductProvider, useProductContext };
