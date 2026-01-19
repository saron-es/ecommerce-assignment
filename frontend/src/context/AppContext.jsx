import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // DEMO MODE: hardcoded admin
  const [user, setUser] = useState({
    username: "admin",
    role: "Admin",
  });

  const [token, setToken] = useState("");

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

