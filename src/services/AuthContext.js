import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, register, logout as apiLogout, fetchUserWithToken  } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  
    console.log("🔄 useEffect - Token from localStorage:", token);
    console.log("🔄 useEffect - User from localStorage:", storedUser);
  
    if (token) {
      if (storedUser) {
        // Set auth state immediately with local user (faster)
        setAuthState({
          user: JSON.parse(storedUser),
          token,
          isAuthenticated: true,
          isLoading: true, // Still verifying from API
        });
      }
  
      // Optionally verify token with API (recommended)
      fetchUserWithToken(token)
        .then((user) => {
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
  
          // ✅ Update stored user info
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((err) => {
          console.log("❌ Token invalid or expired:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        });
    } else {
      console.log("❌ No token found, setting unauthenticated state");
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = async (credentials) => {
    console.log("📥 Signing in with credentials:", credentials);
    const data = await login(credentials); // should return user info + token
    console.log("✅ SignIn Response:", data);

    if (data?.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      setAuthState({
        user: data,
        token: data.token,
        isAuthenticated: true,
      });

      console.log("🔐 Auth state after login:", {
        user: data,
        token: data.token,
      });
    } else {
      console.error("❌ No token received from login response");
    }

    return data;
  };

  const signUp = async (userData) => {
    console.log("📥 Signing up with data:", userData);
    const data = await register(userData);
    console.log("✅ SignUp Response:", data);

    if (data?.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));

      setAuthState({
        user: data,
        token: data.token,
        isAuthenticated: true,
      });

      console.log("🔐 Auth state after signup:", {
        user: data,
        token: data.token,
      });
    }

    return data;
  };

  const signOut = () => {
    console.log("🚪 Logging out");
    apiLogout(); // Optional API call to invalidate token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileData');


    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });

    console.log("👋 Signed out, auth state cleared");
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
