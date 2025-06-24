import { createContext } from "react";

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

export const AuthTestContext = createContext<AuthContextType | undefined>(
  undefined
);
