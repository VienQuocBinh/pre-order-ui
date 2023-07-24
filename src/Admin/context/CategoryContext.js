import React, { createContext, useContext } from "react";
import useCategory from "../hooks/useCategory";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const categoryMethods = useCategory();

  return (
    <CategoryContext.Provider value={categoryMethods}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider, useCategoryContext };
