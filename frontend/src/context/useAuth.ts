import React, { createContext } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
