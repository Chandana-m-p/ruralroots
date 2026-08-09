import React, { createContext, useContext, useState } from 'react';

export interface AuthUser {
  userId: number;
  phoneNumber: string;
  fullName: string;
  role: string;
  preferredLanguage?: string;
  selectedHubId?: number;
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
    try {
      const savedUser = localStorage.getItem('rr_user_session');
      const savedToken = localStorage.getItem('rr_auth_token');
      if (savedUser && savedToken) {
        const parsed = JSON.parse(savedUser);
        return { ...parsed, token: savedToken };
      }
    } catch {
      localStorage.removeItem('rr_user_session');
      localStorage.removeItem('rr_auth_token');
    }
    return null;
  });

  const login = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem('rr_user_session', JSON.stringify({
      userId: userData.userId,
      phoneNumber: userData.phoneNumber,
      fullName: userData.fullName,
      role: userData.role,
      preferredLanguage: userData.preferredLanguage,
      selectedHubId: userData.selectedHubId
    }));
    localStorage.setItem('rr_auth_token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rr_user_session');
    localStorage.removeItem('rr_auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, token: user?.token || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
