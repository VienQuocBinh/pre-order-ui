import { createContext, useContext } from "react";
import useOrder from "../hooks/useOrder";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
    const ordertMethods = useOrder();
  
    return (
      <OrderContext.Provider value={ordertMethods}>
        {children}
      </OrderContext.Provider>
    );
  };
  
  const useOrderContext = () => {
    return useContext(OrderContext);
  };
  
  export { OrderProvider, useOrderContext };