import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthUser {
  userId: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('rr_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('rr_user', JSON.stringify(userData));
    localStorage.setItem('rr_token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rr_user');
    localStorage.removeItem('rr_token');
  };

  return (
    <AuthContext.Provider value={{ user, token: user?.token || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
