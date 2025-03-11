import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const TokenProvider = createContext();
// eslint-disable-next-line react/prop-types
function ContextTokenProvider({ children }) {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    localStorage.getItem("token") && setToken(JSON.parse(localStorage.getItem("token")));
  }, [token]);
  return <TokenProvider.Provider value={{ token, setToken }}>{children}</TokenProvider.Provider>;
}

export default ContextTokenProvider;
