import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    // In a real app, you would check for stored tokens here
    const storedUser = await getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };

  const getStoredUser = async () => {
    // Simulate getting stored user data
    return null;
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API response
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'farmer',
      };
      
      setUser(mockUser);
      // In real app, store token and user data
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    // In real app, clear stored tokens
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};