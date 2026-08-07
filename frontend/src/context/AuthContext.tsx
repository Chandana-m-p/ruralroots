import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  userId: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  token: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (userData: AuthUser) => void;
  loginWithCredentials: (phone: string, pass: string, role: string) => Promise<void>;
  requestOtp: (phone: string, role: string) => Promise<string>;
  verifyOtp: (phone: string, code: string) => Promise<void>;
  loginAsDemo: (role: 'ROLE_BUYER' | 'ROLE_HUB_MANAGER') => void;
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

  const loginWithCredentials = async (phone: string, pass: string, role: string) => {
    const mockUser: AuthUser = {
      userId: role === 'ROLE_HUB_MANAGER' ? 2 : 1,
      phoneNumber: phone,
      fullName: role === 'ROLE_HUB_MANAGER' ? 'Kalyan Store Manager' : 'Rural Buyer',
      role: role,
      token: 'demo-jwt-token-' + Date.now()
    };
    login(mockUser);
  };

  const requestOtp = async (phone: string, role: string) => {
    return '1234';
  };

  const verifyOtp = async (phone: string, code: string) => {
    const mockUser: AuthUser = {
      userId: 1,
      phoneNumber: phone,
      fullName: 'Rural Buyer',
      role: 'ROLE_BUYER',
      token: 'demo-jwt-token-' + Date.now()
    };
    login(mockUser);
  };

  const loginAsDemo = (role: 'ROLE_BUYER' | 'ROLE_HUB_MANAGER') => {
    const demoUser: AuthUser = {
      userId: role === 'ROLE_HUB_MANAGER' ? 2 : 1,
      phoneNumber: role === 'ROLE_HUB_MANAGER' ? '9876543211' : '9876543210',
      fullName: role === 'ROLE_HUB_MANAGER' ? 'Ramgarh Hub Manager' : 'Sunita Devi (Buyer)',
      role: role,
      token: 'demo-jwt-token-' + Date.now()
    };
    login(demoUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rr_user');
    localStorage.removeItem('rr_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token: user?.token || null, 
      login, 
      loginWithCredentials,
      requestOtp,
      verifyOtp,
      loginAsDemo,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
