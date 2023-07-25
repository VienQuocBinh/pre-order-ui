import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/user";

const initialUser: any = null;

const AuthContext = createContext({
  user: initialUser,
  loading: true,
});

function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUser(user);
    setLoading(loading);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
