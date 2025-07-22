import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QRGenerator.module.css";

function QRGenerator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partnerId: "",
    rewardId: "",
    locationName: "",
    locationAddress: "",
    latitude: "",
    longitude: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Retrieve user and token from localStorage
      const user = JSON.parse(localStorage.getItem("ecoRewardsUser"));
      const token = user?.token;

      const response = await fetch(
        "https://ecorewards-deploy.vercel.app/api/v1/qr/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzk3MzQ2Mzk2YjU5ODE1MjRhNTZmZiIsImlhdCI6MTc1MTU0Nzc4MywiZXhwIjoxNzUxNjM0MTgzfQ.HJ_G6yjsfmbBocRN6aj1WNJV_IkclCRSE0fjGq-G65A`,
          },
          body: JSON.stringify({
            partnerId: formData.partnerId,
            rewardId: formData.rewardId,
            location: {
              name: formData.locationName,
              address: formData.locationAddress,
              coordinates: {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
              },
            },
            notes: formData.notes,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        console.log("Full API Response:", result);
        console.log("QR Code value:", result.data.qrCode);
        console.log("Navigating to:", `/qr/display/${result.data.qrCode}`);

        navigate(`/qr/display/${result.data.qrCode}`);
      } else {
        setError(result.message || "Failed to generate QR code");
      }
    } catch (err) {
      setError("Error connecting to API: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Generate QR Code</h2>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Partner ID</label>
          <input
            type="text"
            name="partnerId"
            value={formData.partnerId}
            onChange={handleInputChange}
            required
            placeholder="Enter partner ID"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Reward ID</label>
          <input
            type="text"
            name="rewardId"
            value={formData.rewardId}
            onChange={handleInputChange}
            required
            placeholder="Enter reward ID"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Location Name</label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleInputChange}
            required
            placeholder="Enter location name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Location Address</label>
          <input
            type="text"
            name="locationAddress"
            value={formData.locationAddress}
            onChange={handleInputChange}
            required
            placeholder="Enter location address"
          />
        </div>

        <div className={styles.coordinatesGroup}>
          <div className={styles.formGroup}>
            <label>Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              required
              placeholder="Enter latitude"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              required
              placeholder="Enter longitude"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter any additional notes"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>
    </div>
  );
}

export default QRGenerator;
