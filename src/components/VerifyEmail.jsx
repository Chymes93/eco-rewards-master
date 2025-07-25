import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState("verifying"); 
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/verify-email/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          // Email verification successful - user is now logged in
          setVerificationStatus("success");

          // Set user data and token from the response
          if (data.user) {
            setUser(data.user);
          }
          if (data.token) {
            setToken(data.token);
            localStorage.setItem("token", data.token);
          }

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          setVerificationStatus("error");
          setErrorMessage(data.error || "Verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        setErrorMessage("Network error. Please try again.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setVerificationStatus("error");
      setErrorMessage("Invalid verification link");
    }
  }, [token, navigate, setUser, setToken]);

  const handleResendVerification = async () => {
    if (!userEmail) {
      alert("Please enter your email address");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Verification email sent successfully! Please check your inbox.");
      } else {
        alert(data.error || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      alert("Failed to resend verification email");
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return (
          <div style={{ textAlign: "center" }}>
            <LoadingSpinner size="large" />
            <h2 className={styles.authTitle} style={{ marginTop: "2rem" }}>
              Verifying Your Email
            </h2>
            <p className={styles.authSubtitle}>
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case "success":
        return (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
            <h2 className={styles.authTitle} style={{ color: "#16a34a" }}>
              Email Verified Successfully!
            </h2>
            <p className={styles.authSubtitle} style={{ marginBottom: "2rem" }}>
              Welcome to EcoRewards! Your account has been verified and you're
              now logged in.
            </p>

            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  color: "#166534",
                  marginBottom: "1rem",
                  fontSize: "1rem",
                }}
              >
                🎉 You're all set! Now you can:
              </h3>
              <ul
                style={{
                  color: "#15803d",
                  textAlign: "left",
                  lineHeight: "1.6",
                  maxWidth: "300px",
                  margin: "0 auto",
                }}
              >
                <li>Earn eco points for sustainable actions</li>
                <li>Claim rewards from our partners</li>
                <li>Join eco challenges</li>
                <li>Track your environmental impact</li>
              </ul>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: "#dbeafe",
                border: "1px solid #93c5fd",
                borderRadius: "6px",
                marginBottom: "2rem",
              }}
            >
              <p style={{ fontSize: "0.9rem", color: "#1e40af", margin: 0 }}>
                🚀 Redirecting to your dashboard in 3 seconds...
              </p>
            </div>

            <Link
              to="/dashboard"
              className={styles.submitButton}
              style={{
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
              }}
            >
              Go to Dashboard Now
            </Link>
          </div>
        );

      case "error":
        return (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>❌</div>
            <h2 className={styles.authTitle} style={{ color: "#dc2626" }}>
              Verification Failed
            </h2>
            <p className={styles.authSubtitle} style={{ marginBottom: "2rem" }}>
              {errorMessage}
            </p>

            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  color: "#991b1b",
                  marginBottom: "1rem",
                  fontSize: "1rem",
                }}
              >
                Common reasons for verification failure:
              </h3>
              <ul
                style={{
                  color: "#dc2626",
                  textAlign: "left",
                  lineHeight: "1.6",
                  fontSize: "0.9rem",
                  maxWidth: "350px",
                  margin: "0 auto",
                }}
              >
                <li>The verification link has expired (24 hours)</li>
                <li>The link has already been used</li>
                <li>The link is invalid or corrupted</li>
              </ul>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  marginBottom: "1rem",
                }}
              >
                Need a new verification email?
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.formInput}
                  style={{ maxWidth: "250px" }}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                  onClick={handleResendVerification}
                  className={styles.submitButton}
                  style={{ padding: "0.9rem 1rem", minWidth: "auto" }}
                >
                  Resend
                </button>
              </div>
            </div>

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
                style={{ textDecoration: "underline" }}
              >
                Create New Account
              </Link>
              <Link
                to="/login"
                className={styles.authLink}
                style={{ textDecoration: "underline" }}
              >
                Back to Login
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authImageSection}>
          <div className={styles.authImageContent}>
            {/* Image content can be added here */}
          </div>
        </div>

        <div className={styles.authFormSection}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default VerifyEmail;
