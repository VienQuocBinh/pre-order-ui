import React, { createContext, useContext } from "react";
import useAccount from "../hooks/useAccount";

const AccountContext = createContext();
const AccountProvider = ({children}) => {
  const accountMethods = useAccount();
  return (
    <AccountContext.Provider value={accountMethods}>
      {children}
    </AccountContext.Provider>
  );
};

const useAccountContext = () => {
  return useContext(AccountContext);
};

export { AccountProvider, useAccountContext };
