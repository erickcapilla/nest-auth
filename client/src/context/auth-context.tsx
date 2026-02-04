import { createContext } from "react";
import type { AuthContextType } from "../types/type";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
