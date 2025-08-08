import React, { createContext, useContext, useState, useEffect } from "react";
import { leaderboardAPI } from "../api/api";

const LeaderboardContext = createContext();

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error("useLeaderboard must be used within a LeaderboardProvider");
  }
  return context;
};

export const LeaderboardProvider = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch leaderboard data
  const fetchLeaderboard = async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response = await leaderboardAPI.getLeaderboard(page, limit);

      if (response.success) {
        setLeaderboard(response.data);
        return {
          data: response.data,
          pagination: response.pagination,
          count: response.count,
        };
      } else {
        throw new Error(response.message || "Failed to fetch leaderboard");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching leaderboard:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard statistics
  const fetchStats = async () => {
    try {
      const response = await leaderboardAPI.getStats();

      if (response.success) {
        setStats(response.data);
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching leaderboard stats:", err);
      return null;
    }
  };

  // Get user's rank
  const getUserRank = async (userId) => {
    try {
      const response = await leaderboardAPI.getUserRank(userId);

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch user rank");
      }
    } catch (err) {
      console.error("Error fetching user rank:", err);
      return null;
    }
  };

  // Update user points
  const updateUserPoints = async (
    userId,
    points,
    activityType,
    description
  ) => {
    try {
      const response = await leaderboardAPI.updateUserPoints(
        userId,
        points,
        activityType,
        description
      );

      if (response.success) {
        // Refresh leaderboard after points update
        await fetchLeaderboard();
        return response.data;
      } else {
        throw new Error(response.message || "Failed to update points");
      }
    } catch (err) {
      console.error("Error updating user points:", err);
      throw err;
    }
  };

  // Get top users (for homepage)
  const getTopUsers = (limit = 5) => {
    return leaderboard.slice(0, limit);
  };

  // Refresh all data
  const refreshData = async () => {
    await Promise.all([fetchLeaderboard(), fetchStats()]);
  };

  // Load initial data when component mounts
  useEffect(() => {
    refreshData();
  }, []);

  const value = {
    leaderboard,
    stats,
    loading,
    error,
    fetchLeaderboard,
    fetchStats,
    getUserRank,
    updateUserPoints,
    getTopUsers,
    refreshData,
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};
