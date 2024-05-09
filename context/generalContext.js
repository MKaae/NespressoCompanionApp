import { createContext, useState } from "react";

export const StatusContext = createContext();

export default function StatusContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [auth, setAuth] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
    auth,
    setAuth
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
}
