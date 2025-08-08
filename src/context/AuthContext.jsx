import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";

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
    const storedUser = localStorage.getItem("ecoRewardsUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("ecoRewardsUser");
      }
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await authAPI.register(userData);

      // Check if the response indicates email verification is required
      if (data.message && data.message.includes("verify")) {
        return {
          success: true,
          requiresEmailVerification: true,
          message: data.message,
          email: userData.email,
        };
      } else {
        // Old flow - immediate login (if backend doesn't have email verification yet)
        const user = {
          ...data.user,
          token: data.token,
        };

        localStorage.setItem("ecoRewardsUser", JSON.stringify(user));
        setCurrentUser(user);
        navigate("/");
        return { success: true };
      }
    } catch (error) {
      // Map technical errors to user-friendly messages
      let userMessage = "Registration failed. Please try again.";

      if (error.message.includes("already exists")) {
        userMessage =
          "An account with this email already exists. Please try logging in instead.";
      } else if (error.message.includes("validation")) {
        userMessage = "Please check your information and try again.";
      } else if (error.message.includes("Service temporarily unavailable")) {
        userMessage =
          "Service temporarily unavailable. Please try again later.";
      } else if (error.message.includes("Server error")) {
        userMessage = "Server error. Please try again in a few minutes.";
      } else if (
        error.name === "TypeError" ||
        error.message.includes("fetch")
      ) {
        userMessage =
          "Unable to connect to server. Please check your internet connection and try again.";
      } else {
        userMessage = error.message;
      }

      setAuthError(userMessage);
      return { success: false, error: userMessage };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await authAPI.login(credentials);

      // Store user data and token
      const user = {
        ...data.user,
        token: data.token,
      };

      localStorage.setItem("ecoRewardsUser", JSON.stringify(user));
      setCurrentUser(user);
      navigate("/");
      return { success: true };
    } catch (error) {
      // Handle specific error cases
      let userMessage = "Login failed. Please try again.";

      if (
        error.message.includes("Invalid credentials") ||
        error.message.includes("401")
      ) {
        // Check if it's an email verification issue
        if (
          error.message.includes("verify") ||
          error.message.includes("verification")
        ) {
          setAuthError("Please verify your email before logging in");
          return {
            success: false,
            requiresEmailVerification: true,
            email: credentials.email,
            error: "Please verify your email before logging in",
          };
        } else {
          userMessage =
            "Invalid email or password. Please check your credentials and try again.";
        }
      } else if (error.message.includes("Service temporarily unavailable")) {
        userMessage =
          "Service temporarily unavailable. Please try again later.";
      } else if (error.message.includes("Server error")) {
        userMessage = "Server error. Please try again in a few minutes.";
      } else if (
        error.name === "TypeError" ||
        error.message.includes("fetch")
      ) {
        userMessage =
          "Unable to connect to server. Please check your internet connection and try again.";
      } else {
        userMessage = error.message;
      }

      setAuthError(userMessage);
      return { success: false, error: userMessage };
    } finally {
      setLoading(false);
    }
  };

  // New function: Verify email with token
  const verifyEmail = async (token) => {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await authAPI.verifyEmail(token);

      // Email verified successfully - log user in
      const user = {
        ...data.user,
        token: data.token,
      };

      localStorage.setItem("ecoRewardsUser", JSON.stringify(user));
      setCurrentUser(user);

      return { success: true, user };
    } catch (error) {
      const errorMessage = error.message || "Email verification failed";
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // New function: Resend email verification
  const resendEmailVerification = async (email) => {
    try {
      setLoading(true);
      setAuthError(null);

      const data = await authAPI.resendEmailVerification(email);

      return { success: true, message: data.message };
    } catch (error) {
      const errorMessage =
        error.message || "Failed to resend verification email";
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get current user data (refresh user info)
  const getCurrentUser = async () => {
    try {
      if (!currentUser?.token) {
        throw new Error("No token available");
      }

      const data = await authAPI.getMe(currentUser.token);

      const updatedUser = {
        ...currentUser,
        ...data.data,
      };

      localStorage.setItem("ecoRewardsUser", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Failed to get current user:", error);
      return { success: false, error: error.message };
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
        throw new Error("Invalid OTP format");
      }

      // Create user from temporary data
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        ...tempUserData,
        points: 0,
      };

      // Store user in local storage
      localStorage.setItem("ecoRewardsUser", JSON.stringify(user));
      setCurrentUser(user);

      // Clear temporary data
      setTempUserData(null);
      setVerificationId(null);
      setVerificationMethod(null);

      // Navigate to landing page
      navigate("/");

      return { success: true };
    } catch (error) {
      setAuthError(error.message || "Invalid OTP");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API if user has a token
      if (currentUser?.token) {
        try {
          await authAPI.logout(currentUser.token);
        } catch (error) {
          console.error("Logout API call failed:", error);
          // Continue with local logout even if API fails
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Always clear local storage and state
      localStorage.removeItem("ecoRewardsUser");
      setCurrentUser(null);
      navigate("/");
    }
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

      return { success: true, message: "OTP resent successfully" };
    } catch (error) {
      setAuthError(error.message || "Failed to resend OTP");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for manual state updates
  const setUser = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("ecoRewardsUser", JSON.stringify(user));
    }
  };

  const setToken = (token) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, token };
      setCurrentUser(updatedUser);
      localStorage.setItem("ecoRewardsUser", JSON.stringify(updatedUser));
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
    verifyEmail,
    resendEmailVerification,
    getCurrentUser, // New function to refresh user data
    setUser,
    setToken,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
