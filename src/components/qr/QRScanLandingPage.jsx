import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './QRScanLandingPage.module.css';

function QRScanLandingPage() {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const [scanData, setScanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (qrId) {
      fetchScanData(qrId);
    }
  }, [qrId]);

  const fetchScanData = async (id) => {
    try {
      const response = await fetch(
        `https://ecorewards-deploy.vercel.app/api/v1/qr/scan/${id}`
      );
      const result = await response.json();

      if (result.success) {
        setScanData(result.data);
      } else {
        setError('QR Code not found or invalid');
      }
    } catch (err) {
      setError('Error loading QR code data: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClaimReward = async () => {
    try {
      // Retrieve user and token from localStorage
      const user = JSON.parse(localStorage.getItem('ecoRewardsUser'));
      const token = user?.token;

      const response = await fetch(
        `https://ecorewards-deploy.vercel.app/api/v1/qr/claim/${qrId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzk3MzQ2Mzk2YjU5ODE1MjRhNTZmZiIsImlhdCI6MTc1MTU0Nzc4MywiZXhwIjoxNzUxNjM0MTgzfQ.HJ_G6yjsfmbBocRN6aj1WNJV_IkclCRSE0fjGq-G65A`,
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        // Show success message or redirect
        navigate('/dashboard');
      } else {
        setError(result.message || 'Failed to claim reward');
      }
    } catch (err) {
      setError('Error claiming reward: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading reward details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Go Back
        </button>
      </div>
    );
  }

  if (!scanData) return null;

  const { qrCode, partner, reward, userInfo } = scanData;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          ← Back
        </button>
        <div className={styles.scanCount}>
          Scanned: {qrCode.scanCount} times
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.welcomeSection}>
          <div className={styles.emoji}>🌱</div>
          <h1>Welcome to {partner.name}!</h1>
          <p>You've discovered an eco-reward opportunity</p>
        </div>

        <div className={styles.partnerCard}>
          <div className={styles.partnerHeader}>
            <h2>{partner.name}</h2>
            <p className={styles.category}>📍 {partner.category}</p>
            <p className={styles.description}>{partner.description}</p>
          </div>
        </div>

        <div className={styles.rewardCard}>
          <div className={styles.rewardHeader}>
            <h3>🎁 Available Reward</h3>
            <div className={styles.points}>{reward.points} points</div>
          </div>

          <div className={styles.rewardContent}>
            <h4>{reward.title}</h4>
            <p>{reward.description}</p>

            {userInfo.isAuthenticated ? (
              <button
                onClick={handleClaimReward}
                className={styles.claimButton}
              >
                🎉 Claim {reward.points} Points Now!
              </button>
            ) : (
              <div className={styles.authButtons}>
                <button
                  onClick={() => navigate('/signup')}
                  className={styles.signupButton}
                >
                  🚀 Sign Up to Claim Reward
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className={styles.loginButton}
                >
                  🔑 Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanLandingPage;
