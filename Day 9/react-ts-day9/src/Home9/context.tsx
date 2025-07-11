import { createContext } from "react";

interface LoginContextType {
    user: string | null;
    setUser: (user: string) => void;
  }
  
  export const LoginContext = createContext<LoginContextType>({
    user: null,
    setUser: () => {},
  });
  