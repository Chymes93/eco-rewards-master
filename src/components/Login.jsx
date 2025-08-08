import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] =
    useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const { login, loading, authError, setAuthError } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (validateForm()) {
      toast.loading("Signing you in...");

      try {
        const result = await login({ email, password });

        toast.dismiss(); // Remove loading toast

        // Check if login failed due to unverified email
        if (result && result.requiresEmailVerification) {
          toast.error("Please verify your email before logging in", {
            duration: 5000,
          });

          // Show resend verification toast after a short delay
          setTimeout(() => {
            toast(
              (t) => (
                <div>
                  <span>Need to resend verification email?</span>
                  <button
                    onClick={() => {
                      handleResendVerification();
                      toast.dismiss(t.id);
                    }}
                    style={{
                      marginLeft: "8px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Resend
                  </button>
                </div>
              ),
              {
                duration: 8000,
              }
            );
          }, 1000);

          setUnverifiedEmail(email);
        } else {
          // Successful login
          toast.success("Login successful!");
        }
      } catch (error) {
        toast.dismiss(); // Remove loading toast

        // Check if the error response indicates email verification needed
        if (
          error.response &&
          error.response.data &&
          error.response.data.requiresEmailVerification
        ) {
          toast.error("Please verify your email before logging in", {
            duration: 5000,
          });

          // Show resend verification toast
          setTimeout(() => {
            toast(
              (t) => (
                <div>
                  <span>Need to resend verification email?</span>
                  <button
                    onClick={() => {
                      handleResendVerification();
                      toast.dismiss(t.id);
                    }}
                    style={{
                      marginLeft: "8px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Resend
                  </button>
                </div>
              ),
              {
                duration: 8000,
              }
            );
          }, 1000);

          setUnverifiedEmail(email);
        } else {
          // Other login errors
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      }
    } else {
      // Form validation failed
      toast.error("Please fix the errors below");
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, this would integrate with social login providers
    alert(`${provider} login would be implemented here`);
  };

  const handleResendVerification = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: unverifiedEmail }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          "Verification email sent successfully! Please check your inbox."
        );
        setShowEmailVerificationAlert(false);
      } else {
        toast.error(data.error || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Failed to resend verification email. Please try again.");
    }
  };

  const dismissVerificationAlert = () => {
    setShowEmailVerificationAlert(false);
    setUnverifiedEmail("");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authImageSection}>
          <div className={styles.authImageContent}>
            {/* Image content can be added here */}
          </div>
        </div>

        <div className={styles.authFormSection}>
          <h2 className={styles.authTitle}>Login</h2>
          <p className={styles.authSubtitle}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.authLink}>
              Sign Up
            </Link>
          </p>

          {authError && !showEmailVerificationAlert && (
            <div className={styles.errorMessage} role="alert">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className={styles.errorMessage}>{errors.email}</div>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  className={styles.formInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {errors.password && (
                <div className={styles.errorMessage}>{errors.password}</div>
              )}
            </div>

            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <Link to="/forgot-password" className={styles.authLink}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <div className={styles.socialLogin}>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin("Google")}
              aria-label="Login with Google"
            >
              <FaGoogle />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin("Facebook")}
              aria-label="Login with Facebook"
            >
              <FaFacebook />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin("Twitter")}
              aria-label="Login with Twitter"
            >
              <FaXTwitter />
            </button>
          </div>

          {/* Additional help section */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.85rem",
                color: "#6b7280",
                margin: "0 0 0.5rem 0",
              }}
            >
              Having trouble logging in?
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/signup"
                className={styles.authLink}
                style={{ fontSize: "0.85rem" }}
              >
                Create Account
              </Link>
              <span style={{ color: "#d1d5db" }}>|</span>
              <a
                href="mailto:ecorewards01@gmail.com"
                className={styles.authLink}
                style={{ fontSize: "0.85rem" }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
