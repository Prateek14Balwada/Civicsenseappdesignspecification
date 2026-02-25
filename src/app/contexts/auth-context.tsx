import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("civicsense_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole = "citizen") => {
    // Mock login
    const mockUser: User = {
      id: role === "admin" ? "admin-1" : "user-1",
      name: role === "admin" ? "Admin User" : "John Doe",
      email,
      role,
      trustScore: 85,
      badges: ["Verified Reporter", "Community Guardian"],
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem("civicsense_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("civicsense_user");
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: "citizen",
      trustScore: 50,
      badges: [],
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    localStorage.setItem("civicsense_user", JSON.stringify(mockUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
