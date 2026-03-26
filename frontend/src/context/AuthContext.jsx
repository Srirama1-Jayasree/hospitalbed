import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email || '');
      localStorage.setItem('role', role || '');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    }
  }, [token, email, role]);

  const value = useMemo(
    () => ({
      token,
      email,
      role,
      isAuthenticated: Boolean(token),
      login: ({ token: newToken, email: newEmail, role: newRole }) => {
        setToken(newToken);
        setEmail(newEmail);
        setRole(newRole);
      },
      logout: () => {
        setToken(null);
        setEmail(null);
        setRole(null);
      },
    }),
    [token, email, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
