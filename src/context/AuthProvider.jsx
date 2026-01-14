import { useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { decodeToken, expiredToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize token and user synchronously to avoid setState in effect
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('token');
    if (!stored) return null;
    if (expiredToken(stored)) {
      localStorage.removeItem('token');
      return null;
    }
    return stored;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('token');
    if (!stored) return null;
    if (expiredToken(stored)) return null;
    const decoded = decodeToken(stored);
    if (!decoded) return null;
    return {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.userRole,
    };
  });

  const loading = false;

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const login = (authToken, role) => {
    const decoded = decodeToken(authToken);

    if (!decoded) {
      throw new Error('Invalid token');
    }

    // Store token in localStorage
    localStorage.setItem('token', authToken);

    setToken(authToken);
    setUser({
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.userRole || role,
    });

    // Redirect based on role
    if (decoded.userRole === 'ADMIN' || role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/battleRounds');
    }
  };

  const isAuthenticated = () => {
    return !!token && !!user && !expiredToken(token);
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
