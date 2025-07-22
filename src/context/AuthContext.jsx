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

  // Simulate signup process
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
            name: userData.fullName,
            email: userData.email,
            password: userData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store user data and token
      const user = {
        ...data.user,
        token: data.token,
      };

      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      // Navigate to home page on successful registration
      navigate('/');

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'An error occurred during signup');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Simulate login process
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

  // Simulate OTP verification
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

  // Resend OTP
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
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
