import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Auth.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../context/AuthContext";

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [countdown, setCountdown] = useState(3);
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail, resendEmailVerification, loading } = useAuth();

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setVerificationStatus("error");
        setErrorMessage("Invalid verification link");
        return;
      }

      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setVerificationStatus("success");
          toast.success(
            "Email verified successfully! Welcome to EcoRewards! 🎉"
          );

          // Start countdown for redirect
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                navigate("/dashboard");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          // Cleanup interval on component unmount
          return () => clearInterval(countdownInterval);
        } else {
          setVerificationStatus("error");
          setErrorMessage(result.error || "Verification failed");
          toast.error(result.error || "Email verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        setErrorMessage("Network error. Please try again.");
        toast.error("Network error. Please try again.");
      }
    };

    handleVerification();
  }, [token, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    if (!userEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(userEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await resendEmailVerification(userEmail);

      if (result.success) {
        toast.success(
          "Verification email sent successfully! Please check your inbox."
        );
        setUserEmail(""); // Clear the input
      } else {
        toast.error(result.error || "Failed to resend verification email");
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      toast.error("Failed to resend verification email");
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
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">
                💡 This usually takes just a few seconds
              </p>
            </div>
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
                  listStyle: "none",
                  padding: 0,
                }}
              >
                <li>🌱 Earn eco points for sustainable actions</li>
                <li>🎁 Claim rewards from our partners</li>
                <li>🏆 Join eco challenges and competitions</li>
                <li>📊 Track your environmental impact</li>
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
                🚀 Redirecting to your dashboard in {countdown} seconds...
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
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.formInput}
                  style={{ maxWidth: "250px", marginBottom: "0.5rem" }}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleResendVerification();
                    }
                  }}
                />
                <button
                  onClick={handleResendVerification}
                  disabled={loading}
                  className={styles.submitButton}
                  style={{
                    padding: "0.9rem 1rem",
                    minWidth: "auto",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Resend"}
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
