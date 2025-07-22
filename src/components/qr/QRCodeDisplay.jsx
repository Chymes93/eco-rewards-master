import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./QRCodeDisplay.module.css";

function QRCodeDisplay() {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("QR ID from URL:", qrId);

  useEffect(() => {
    console.log("QR ID from URL:", qrId);

    if (qrId) {
      console.log("About to fetch QR data for ID:", qrId);
      fetchQRData(qrId);
    }
  }, [qrId]);

  // const fetchQRData = async (id) => {
  //   try {
  //     // Retrieve user and token from localStorage
  //     const user = JSON.parse(localStorage.getItem("ecoRewardsUser"));
  //     const token = user?.token;

  //     const response = await fetch(
  //       `https://ecorewards-deploy.vercel.app/api/v1/qr/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzk3MzQ2Mzk2YjU5ODE1MjRhNTZmZiIsImlhdCI6MTc1MDk2ODI0NywiZXhwIjoxNzUxMDU0NjQ3fQ.M5s_xDY8hxeEAWyaGrpUF2q0-gf8PpEyAKOQJXG0oV8`,
  //         },
  //       }
  //     );
  //     const result = await response.json();

  //     if (result.success) {
  //       setQrData(result.data);
  //     } else {
  //       setError("Failed to load QR code data");
  //     }
  //   } catch (err) {
  //     setError("Error loading QR code data: " + err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchQRData = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("ecoRewardsUser"));
      const token = user?.token;

      console.log("Fetching QR data for ID:", id);
      console.log(
        "API URL:",
        `https://ecorewards-deploy.vercel.app/api/v1/qr/scan/${id}`
      );

      const response = await fetch(
        `https://ecorewards-deploy.vercel.app/api/v1/qr/scan/${id}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzk3MzQ2Mzk2YjU5ODE1MjRhNTZmZiIsImlhdCI6MTc1MDk2ODI0NywiZXhwIjoxNzUxMDU0NjQ3fQ.M5s_xDY8hxeEAWyaGrpUF2q0-gf8PpEyAKOQJXG0oV8`,
          },
        }
      );

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setQrData(result.data);
      } else {
        setError("Failed to load QR code data");
      }
    } catch (err) {
      setError("Error loading QR code data: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading QR code data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3>Error</h3>
        <p>{error}</p>
        <button
          onClick={() => navigate("/qr/generate")}
          className={styles.backButton}
        >
          Back to Generator
        </button>
      </div>
    );
  }

  if (!qrData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Generated QR Code</h2>
        <button
          onClick={() => navigate("/qr/generate")}
          className={styles.backButton}
        >
          Generate New QR
        </button>
      </div>

      <div className={styles.successMessage}>
        <p>✅ QR Code Generated Successfully!</p>
        <p className={styles.qrId}>QR ID: {qrData.qrCode.id}</p>
      </div>

      <div className={styles.qrCodeContainer}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            qrData.scanUrl
          )}`}
          alt="QR Code"
          className={styles.qrCode}
        />
        <p className={styles.scanText}>📱 Scan this QR code with your phone</p>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.detailItem}>
          <span>Location:</span>
          <span>{qrData.qrCode.location.name}</span>
        </div>
        <div className={styles.detailItem}>
          <span>Address:</span>
          <span>{qrData.qrCode.location.address}</span>
        </div>
        <div className={styles.detailItem}>
          <span>Partner:</span>
          <span>{qrData.qrCode.location.name}</span>
        </div>
        <div className={styles.detailItem}>
          <span>Reward:</span>
          <span>{qrData.reward.title}</span>
        </div>
        <div className={styles.detailItem}>
          <span>Points:</span>
          <span className={styles.points}>{qrData.reward.points} points</span>
        </div>
        <div className={styles.detailItem}>
          <span>Category:</span>
          <span className={styles.category}>{qrData.reward.category}</span>
        </div>
      </div>

      <div className={styles.scanUrlContainer}>
        <p>Scan URL:</p>
        <div className={styles.scanUrlWrapper}>
          <div className={styles.scanUrl}>{qrData.scanUrl}</div>
          <button
            onClick={() => copyToClipboard(qrData.scanUrl)}
            className={styles.copyButton}
          >
            Copy
          </button>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <a
          href={qrData.scanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.testButton}
        >
          🔗 Test Scan URL
        </a>
        <button
          onClick={() => navigate(`/qr/scan/${qrData.qrCode}`)}
          className={styles.previewButton}
        >
          📱 Preview Mobile Page
        </button>
      </div>
    </div>
  );
}

export default QRCodeDisplay;
