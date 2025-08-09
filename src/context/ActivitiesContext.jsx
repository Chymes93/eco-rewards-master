import React, { createContext, useContext, useState, useEffect } from "react";
import { activitiesAPI } from "../api/api";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const ActivitiesContext = createContext();

export const useActivities = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used within an ActivitiesProvider");
  }
  return context;
};

export const ActivitiesProvider = ({ children }) => {
    const [isFetching, setIsFetching] = useState(false);

  const { currentUser } = useAuth();
  if (!currentUser || isFetching) return;

  // State
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityStats, setActivityStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanningQR, setScanningQR] = useState(false);

  // Fetch recent activities
  const fetchRecentActivities = async (limit = 5, showToast = false) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      setError(null);

      const response = await activitiesAPI.getRecentActivities(limit);

      if (response.success) {
        setRecentActivities(response.data);
        if (showToast) {
          toast.success("Activities refreshed successfully");
        }
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch activities");
      }
    } catch (err) {
      console.error("Error fetching recent activities:", err);
      setError(err.message);
      if (showToast) {
        toast.error("Failed to refresh activities");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch activity statistics
  const fetchActivityStats = async () => {
    if (!currentUser) return;

    try {
      const response = await activitiesAPI.getActivityStats();

      if (response.success) {
        setActivityStats(response.data);
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch activity stats");
      }
    } catch (err) {
      console.error("Error fetching activity stats:", err);
      return null;
    }
  };

  // Create manual activity
  const createActivity = async (activityData) => {
    if (!currentUser) {
      toast.error("Please log in to create activities");
      return { success: false, error: "Not authenticated" };
    }

    try {
      setLoading(true);

      const response = await activitiesAPI.createActivity(activityData);

      if (response.success) {
        toast.success(
          `Activity completed! You earned ${response.data.pointsEarned} points! 🎉`
        );

        // Refresh activities and stats
        await Promise.all([fetchRecentActivities(), fetchActivityStats()]);

        return response;
      } else {
        throw new Error(response.message || "Failed to create activity");
      }
    } catch (err) {
      console.error("Error creating activity:", err);
      toast.error(err.message || "Failed to create activity");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Scan QR Code
  const scanQRCode = async (qrCode, productName = null, location = null) => {
    if (!currentUser) {
      toast.error("Please log in to scan QR codes");
      return { success: false, error: "Not authenticated" };
    }

    if (scanningQR) {
      toast.error("Already scanning a QR code. Please wait...");
      return { success: false, error: "Scan in progress" };
    }

    try {
      setScanningQR(true);
      setError(null);

      const response = await activitiesAPI.scanQRCode(
        qrCode,
        productName,
        location
      );

      if (response.success) {
        const pointsEarned = response.data.pointsEarned || 0;
        const productInfo =
          response.data.reward?.title || productName || "Eco-Friendly Product";
        const partnerInfo = response.data.partner?.name || "";

        toast.success(
          `QR Code scanned successfully! 🎉\n${productInfo}${
            partnerInfo ? ` from ${partnerInfo}` : ""
          }\n+${pointsEarned} points earned!`,
          { duration: 5000 }
        );

        // Refresh activities and stats
        await Promise.all([fetchRecentActivities(), fetchActivityStats()]);

        return response;
      } else {
        throw new Error(response.message || "Failed to scan QR code");
      }
    } catch (err) {
      console.error("Error scanning QR code:", err);

      // Handle specific error cases
      let errorMessage = "Failed to scan QR code";
      if (err.message.includes("not found")) {
        errorMessage =
          "Invalid QR code. Please scan a valid eco-product QR code.";
      } else if (err.message.includes("expired")) {
        errorMessage = "This QR code has expired. Please contact the store.";
      } else if (err.message.includes("inactive")) {
        errorMessage = "This product offer is no longer active.";
      } else if (err.message.includes("already claimed")) {
        errorMessage = "You have already claimed this reward.";
      } else {
        errorMessage = err.message || errorMessage;
      }

      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setScanningQR(false);
    }
  };

  // Simulate QR scan (for demo purposes)
  const simulateQRScan = async () => {
    // Generate random QR code data for simulation
    const products = [
      { name: "Bamboo Toothbrush Set", qr: "qr_bamboo_001" },
      { name: "Reusable Water Bottle", qr: "qr_bottle_002" },
      { name: "Organic Cotton T-Shirt", qr: "qr_cotton_003" },
      { name: "Solar Phone Charger", qr: "qr_solar_004" },
      { name: "Biodegradable Cleaning Products", qr: "qr_clean_005" },
    ];

    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const mockQRCode = `${randomProduct.qr}_${Date.now()}`;

    return await scanQRCode(mockQRCode, randomProduct.name, "Current Location");
  };

  // Get user activities with pagination
  const getUserActivities = async (userId = null, page = 1, limit = 10) => {
    const targetUserId = userId || currentUser?.id;

    if (!targetUserId) {
      toast.error("User ID required");
      return { success: false, error: "No user ID" };
    }

    try {
      setLoading(true);

      const response = await activitiesAPI.getUserActivities(
        targetUserId,
        page,
        limit
      );

      if (response.success) {
        return response;
      } else {
        throw new Error(response.message || "Failed to fetch user activities");
      }
    } catch (err) {
      console.error("Error fetching user activities:", err);
      toast.error(err.message || "Failed to fetch activities");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Refresh all activity data
  const refreshAllData = async () => {
    if (!currentUser) return;

    await Promise.all([fetchRecentActivities(5, true), fetchActivityStats()]);
  };

  // Get activity summary for dashboard
  const getActivitySummary = () => {
    if (!recentActivities.length) return null;

    const today = new Date().toDateString();
    const todayActivities = recentActivities.filter((activity) => {
      const activityDate = new Date(
        activity.createdAt || Date.now()
      ).toDateString();
      return activityDate === today;
    });

    const totalPointsToday = todayActivities.reduce(
      (sum, activity) => sum + (activity.points || 0),
      0
    );
    const qrScansToday = todayActivities.filter(
      (activity) => activity.activityType === "qr_scan"
    ).length;

    return {
      todayActivities: todayActivities.length,
      totalPointsToday,
      qrScansToday,
      recentCount: recentActivities.length,
    };
  };

  // Load initial data when user changes
  useEffect(() => {
    if (currentUser) {
      fetchRecentActivities();
      fetchActivityStats();
    } else {
      // Clear data when user logs out
      setRecentActivities([]);
      setActivityStats(null);
      setError(null);
    }
  }, [currentUser?.id]);

  const value = {
    // State
    recentActivities,
    activityStats,
    loading,
    error,
    scanningQR,

    // Functions
    fetchRecentActivities,
    fetchActivityStats,
    createActivity,
    scanQRCode,
    simulateQRScan,
    getUserActivities,
    refreshAllData,

    // Computed values
    activitySummary: getActivitySummary(),
    hasActivities: recentActivities.length > 0,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  );
};
