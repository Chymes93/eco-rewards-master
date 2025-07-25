import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState(null); // 'email' or 'phone'
  const [tempUserData, setTempUserData] = useState(null);

  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoRewardsUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('ecoRewardsUser');
      }
    }
    setLoading(false);
  }, []);

  // Updated signup process with email verification
  const signup = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);

      const response = await fetch(
        'https://ecorewards-deploy.vercel.app/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            name: userData.name || userData.fullName, // Support both field names
            email: userData.email,
            password: userData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Check if the response indicates email verification is required
      if (data.message && data.message.includes('verify')) {
        // Email verification required - don't log user in yet
        return { 
          success: true, 
          requiresEmailVerification: true,
          message: data.message,
          email: userData.email 
        };
      } else {
        // Old flow - immediate login (if backend doesn't have email verification yet)
        const user = {
          ...data.user,
          token: data.token,
        };

        localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
        setCurrentUser(user);
        navigate('/');
        return { success: true };
      }
    } catch (error) {
      setAuthError(error.message || 'An error occurred during signup');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Updated login process to handle email verification
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);

      const response = await fetch(
        'https://ecorewards-deploy.vercel.app/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Check if it's an email verification error
        if (data.requiresEmailVerification) {
          setAuthError('Please verify your email before logging in');
          return { 
            success: false, 
            requiresEmailVerification: true,
            email: data.email || credentials.email,
            error: 'Please verify your email before logging in'
          };
        }
        throw new Error(data.error || 'Login failed');
      }

      // Store user data and token
      const user = {
        ...data.user,
        token: data.token,
      };

      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      // Navigate to home page
      navigate('/');

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Invalid email or password');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // New function: Verify email with token
  const verifyEmail = async (token) => {
    try {
      setLoading(true);
      setAuthError(null);

      const response = await fetch(
        `https://ecorewards-deploy.vercel.app/api/v1/auth/verify-email/${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Email verification failed');
      }

      // Email verified successfully - log user in
      const user = {
        ...data.user,
        token: data.token,
      };

      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      setAuthError(error.message || 'Email verification failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // New function: Resend email verification
  const resendEmailVerification = async (email) => {
    try {
      setLoading(true);
      setAuthError(null);

      const response = await fetch(
        'https://ecorewards-deploy.vercel.app/api/v1/auth/resend-verification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend verification email');
      }

      return { success: true, message: data.message };
    } catch (error) {
      setAuthError(error.message || 'Failed to resend verification email');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Existing OTP verification (keeping for backward compatibility)
  const verifyOTP = async (otp) => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll accept any 6-digit OTP
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        throw new Error('Invalid OTP format');
      }

      // Create user from temporary data
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        ...tempUserData,
        points: 0,
      };

      // Store user in local storage
      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      // Clear temporary data
      setTempUserData(null);
      setVerificationId(null);
      setVerificationMethod(null);

      // Navigate to landing page
      navigate('/');

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Invalid OTP');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ecoRewardsUser');
    setCurrentUser(null);
    navigate('/');
  };

  // Resend OTP (keeping for backward compatibility)
  const resendOTP = async () => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a new verification ID
      const newVerificationId = Math.random().toString(36).substring(2, 10);
      setVerificationId(newVerificationId);

      return { success: true, message: 'OTP resent successfully' };
    } catch (error) {
      setAuthError(error.message || 'Failed to resend OTP');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for manual state updates
  const setUser = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
    }
  };

  const setToken = (token) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, token };
      setCurrentUser(updatedUser);
      localStorage.setItem('ecoRewardsUser', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    verificationId,
    verificationMethod,
    tempUserData,
    signup,
    login,
    logout,
    verifyOTP,
    resendOTP,
    verifyEmail, // New function
    resendEmailVerification, // New function
    setUser, // Helper function
    setToken, // Helper function
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;