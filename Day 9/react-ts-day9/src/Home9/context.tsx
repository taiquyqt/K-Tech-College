import { createContext } from "react";

export interface LoginContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

// Hàm setUser mặc định cần đúng kiểu (có thể để trống thân hàm)
export const LoginContext = createContext<LoginContextType>({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (_: string | null) => {},
  });
  
