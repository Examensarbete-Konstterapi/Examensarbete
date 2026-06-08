import React, { useState } from "react";
import { AuthContext, type User } from "./useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
