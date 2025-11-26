import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = authService.getToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear storage
            authService.logout();
            setToken(null);
            setIsAuthenticated(false);
          }
        } catch {
          authService.logout();
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    logout,
  };
};
