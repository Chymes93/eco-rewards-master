import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const { signup, loading, authError, setAuthError, resendEmailVerification } =
    useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    toast.loading("Creating your account...");
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors below");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (validateForm()) {
      const userData = {
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      };

      try {
        const result = await signup(userData);

        // Check if registration was successful and requires email verification
        if (result && result.success && result.requiresEmailVerification) {
          toast.dismiss(); // dismiss loading toast
          toast.success(
            "Account created successfully! Please check your email."
          );
          setRegistrationSuccess(true);
          setUserEmail(email);
        }
        // If result.success is true but no requiresEmailVerification,
        // the user was logged in directly (old flow)
      } catch (error) {
        toast.dismiss(); // dismiss loading toast
        toast.error("Registration failed. Please try again.");
        // Error handling is done in the auth context
        console.error("Registration error:", error);
      }
    }
  };

  const handleSocialSignup = (provider) => {
    toast(`${provider} signup coming soon!`, {
      icon: "ℹ️",
      style: {
        background: "#228B22",
        color: "#fff",
      },
    });
  };

  const handleResendVerification = async () => {
    try {
      const result = await resendEmailVerification(userEmail);
      if (result && result.success) {
        toast.success(
          "Verification email sent successfully! Please check your inbox."
        );
      } else {
        toast.error(result?.error || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Failed to resend verification email. Please try again.");
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";

    const [localPart, domain] = email.split("@");

    if (localPart.length <= 3) {
      // If local part is very short, show first char + asterisks
      return `${localPart[0]}***@${domain}`;
    } else {
      // Show first 2 chars + asterisks + last char of local part
      const maskedLocal = `${localPart.slice(0, 2)}***${localPart.slice(-1)}`;
      return `${maskedLocal}@${domain}`;
    }
  };

  // Show success message after registration
  if (registrationSuccess) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authImageSection}>
            <div className={styles.authImageContent}>
              {/* Image content can be added here */}
            </div>
          </div>

          <div className={styles.authFormSection}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📧</div>
              <h2 className={styles.authTitle}>Check Your Email</h2>
              <p
                className={styles.authSubtitle}
                style={{ marginBottom: "2rem" }}
              >
                We've sent a verification link to
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#16a34a",
                  marginBottom: "2rem",
                  fontSize: "1.1rem",
                }}
              >
                {maskEmail(userEmail)}
              </p>

              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                  textAlign: "left",
                }}
              >
                <h3
                  style={{
                    color: "#166534",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                  }}
                >
                  Next Steps:
                </h3>
                <ol
                  style={{
                    color: "#15803d",
                    marginLeft: "1rem",
                    lineHeight: "1.6",
                  }}
                >
                  <li>Check your email inbox</li>
                  <li>Click the verification link</li>
                  <li>You'll be automatically logged in</li>
                </ol>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  Didn't receive the email? Check your spam folder or
                </p>
                <button
                  onClick={handleResendVerification}
                  className={styles.authLink}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    textDecoration: "underline",
                  }}
                >
                  Resend verification email
                </button>
              </div>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#fffbeb",
                  border: "1px solid #fed7aa",
                  borderRadius: "6px",
                  marginBottom: "2rem",
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "#92400e", margin: 0 }}>
                  ⚠️ The verification link expires in 24 hours
                </p>
              </div>

              <Link
                to="/login"
                className={styles.submitButton}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show registration form
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authImageSection}>
          <div className={styles.authImageContent}>
            {/* Image content can be added here */}
          </div>
        </div>

        <div className={styles.authFormSection}>
          <h2 className={styles.authTitle}>Sign Up</h2>
          <p className={styles.authSubtitle}>
            Already have an account?{" "}
            <Link to="/login" className={styles.authLink}>
              Login
            </Link>
          </p>

          {authError && (
            <div className={styles.errorMessage} role="alert">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Full Name"
                className={styles.formInput}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && (
                <div className={styles.errorMessage}>{errors.fullName}</div>
              )}
            </div>

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

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
