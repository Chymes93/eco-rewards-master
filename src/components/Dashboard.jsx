import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";
import {
  HelpCircle,
  RefreshCw,
  TrendingUp,
  Calendar,
  Trophy,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useActivities } from "../context/ActivitiesContext";
import DashboardNavbar from "./DashboardNavbar";
import PurchaseSummary from "./PurchaseSummary";
import QRTransactionsSection from "./QRTransactionsSection";
import Footer from "./Footer";

// Import images
import giftIcon from "../assets/Gift.png";
import badgeIcon from "../assets/Badge.png";
import fireIcon from "../assets/Fire.png";
import missionIcon from "../assets/Mission.png";

const Dashboard = () => {
  const { currentUser, loading, getCurrentUser } = useAuth();
  const {
    recentActivities,
    activityStats,
    loading: activitiesLoading,
    error: activitiesError,
    refreshAllData,
    activitySummary,
    hasActivities,
  } = useActivities();
  const navigate = useNavigate();

  // Loading states for data refresh
  const [refreshingData, setRefreshingData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      toast.error("Please log in to access the dashboard");
      navigate("/login");
      return;
    }
  }, [currentUser, loading, navigate]);

  // Refresh user data when component mounts
  useEffect(() => {
    const refreshUserData = async () => {
      if (currentUser?.token) {
        setRefreshingData(true);
        try {
          const result = await getCurrentUser();
          if (result.success) {
            updateLastRefreshTime();
          }
        } catch (error) {
          console.error("Failed to refresh user data:", error);
        } finally {
          setRefreshingData(false);
        }
      }
    };

    refreshUserData();
  }, [currentUser?.token, getCurrentUser]);

  // Update last refresh time
  const updateLastRefreshTime = () => {
    const now = new Date();
    setLastUpdated(
      `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
    );
  };

  // Manual refresh function - now includes activities
  const handleRefresh = async () => {
    if (!currentUser?.token) {
      toast.error("Please log in again");
      navigate("/login");
      return;
    }

    setRefreshingData(true);
    toast.loading("Refreshing your data...");

    try {
      // Refresh both user data and activities data
      const [userResult] = await Promise.all([
        getCurrentUser(),
        refreshAllData(),
      ]);

      if (userResult.success) {
        toast.dismiss();
        toast.success("Data refreshed successfully!");
        updateLastRefreshTime();
      } else {
        toast.dismiss();
        toast.error("Failed to refresh data");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to refresh data");
      console.error("Refresh error:", error);
    } finally {
      setRefreshingData(false);
    }
  };

  const handleExchange = () => {
    toast.success("Exchange feature coming soon! 🎉", {
      duration: 3000,
      icon: "🚀",
    });
  };

  // Show loading state while authenticating
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user (redirect will handle this)
  if (!currentUser) {
    return null;
  }

  // Extract user data with fallbacks
  const userName = currentUser.name || "User";
  const ecoPoints = currentUser.points || 0;
  const ecoLevel = currentUser.ecoLevel || "beginner";

  // Get real activity data from context
  const todayActivities = activitySummary?.todayActivities || 0;
  const totalPointsToday = activitySummary?.totalPointsToday || 0;
  const qrScansToday = activitySummary?.qrScansToday || 0;
  const recentCount = activitySummary?.recentCount || 0;

  // Calculate stats from activity data
  const challengesCompleted = activityStats?.totalActivities || recentCount;
  const badgesEarned = Math.floor(challengesCompleted / 5) + 1; // Badge every 5 activities
  const ongoingStreak =
    activityStats?.currentStreak || (todayActivities > 0 ? 1 : 0);
  const nextMilestone = Math.ceil(ecoPoints / 1000) * 1000; // Next 1000 point milestone

  // Format eco level for display
  const formatEcoLevel = (level) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  // Calculate progress to next level
  const getLevelProgress = () => {
    const levelThresholds = {
      beginner: 0,
      intermediate: 100,
      advanced: 500,
      expert: 1000,
    };

    const currentThreshold = levelThresholds[ecoLevel];
    const nextLevel = Object.keys(levelThresholds).find(
      (level) => levelThresholds[level] > currentThreshold
    );

    if (!nextLevel) return { progress: 100, nextLevel: "Max Level" };

    const nextThreshold = levelThresholds[nextLevel];
    const progress =
      ((ecoPoints - currentThreshold) / (nextThreshold - currentThreshold)) *
      100;

    return {
      progress: Math.min(Math.max(progress, 0), 100),
      nextLevel: nextLevel.charAt(0).toUpperCase() + nextLevel.slice(1),
      pointsNeeded: Math.max(nextThreshold - ecoPoints, 0),
    };
  };

  const levelProgress = getLevelProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <section className="dashboard-section px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
                Hey! {userName}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-500 font-poppins">
                  Updated {lastUpdated}
                </p>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {formatEcoLevel(ecoLevel)} Level
                </span>
                {todayActivities > 0 && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    +{totalPointsToday} points today
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshingData || activitiesLoading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshingData ? "animate-spin" : ""}`}
              />
              {refreshingData ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Error Alert */}
          {activitiesError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">
                <strong>Activity Data Error:</strong> {activitiesError}
              </p>
            </div>
          )}

          {/* Level Progress Bar */}
          {levelProgress.nextLevel !== "Max Level" && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold font-poppins text-gray-800">
                  Progress to {levelProgress.nextLevel}
                </h3>
                <span className="text-sm text-gray-600">
                  {levelProgress.pointsNeeded} points to go
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Stats and Points Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-8 justify-between">
            {/* Left: Stats */}
            <div className="grid grid-cols-2 gap-6 w-full lg:max-w-[640px]">
              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={giftIcon} alt="Gift box" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {challengesCompleted}
                  </span>
                  <span className="text-black font-poppins">
                    Activities <br />
                    Completed
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={badgeIcon} alt="Badge" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {badgesEarned}
                  </span>
                  <span className="text-black font-poppins">
                    Badges <br />
                    Earned
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={fireIcon} alt="Fire" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {ongoingStreak}
                  </span>
                  <span className="text-black font-poppins">
                    Current <br />
                    Streak
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={missionIcon} alt="Flag" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {nextMilestone.toLocaleString()}
                  </span>
                  <span className="text-black font-poppins">
                    Next <br />
                    Milestone
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Points & Exchange */}
            <div className="bg-black text-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full lg:w-[400px] min-w-[300px] self-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-poppins">Points earned</span>
                <HelpCircle
                  size={20}
                  className="text-white/70 cursor-pointer hover:text-white transition-colors"
                  title="Eco points are earned by completing challenges and eco activities."
                  onClick={() =>
                    toast.info(
                      "Eco points are earned by completing challenges and eco activities."
                    )
                  }
                />
              </div>
              <span className="text-6xl font-bold font-poppins mb-2">
                {ecoPoints.toLocaleString()}
              </span>
              <span className="text-xl font-poppins mb-6">Eco points</span>
              <button
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-xl rounded-lg font-poppins transition duration-300 active:scale-95"
                onClick={handleExchange}
              >
                Exchange
              </button>
            </div>
          </div>

          {/* Today's Activity Summary */}
          {todayActivities > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8 border border-green-100">
              <h3 className="text-lg font-bold font-poppins mb-4 text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Today's Activity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {todayActivities}
                  </p>
                  <p className="text-sm text-gray-600">Activities Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {totalPointsToday}
                  </p>
                  <p className="text-sm text-gray-600">Points Earned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {qrScansToday}
                  </p>
                  <p className="text-sm text-gray-600">QR Codes Scanned</p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Activities Preview */}
          {hasActivities && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold font-poppins text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Recent Activities
                </h3>
                <button
                  onClick={() => navigate("/activities")}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivities.slice(0, 3).map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {activity.activityType === "qr_scan"
                          ? "QR Code Scan"
                          : activity.activityType === "manual"
                          ? "Manual Activity"
                          : activity.title || "Activity"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.createdAt
                          ? new Date(activity.createdAt).toLocaleDateString()
                          : "Recently"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        +{activity.points || activity.pointsEarned || 0} pts
                      </p>
                      {activity.partner && (
                        <p className="text-xs text-gray-500">
                          {activity.partner.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Activities Message */}
          {!hasActivities && !activitiesLoading && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Activities Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start your eco-journey by scanning QR codes or logging
                activities!
              </p>
              <button
                onClick={() => navigate("/scan")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Scan Your First QR Code
              </button>
            </div>
          )}

          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-green-500">
            <h3 className="text-lg font-bold font-poppins mb-4 text-gray-800">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-poppins">Email</p>
                <p className="font-medium text-gray-800">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">Eco Level</p>
                <p className="font-medium text-gray-800">
                  {formatEcoLevel(ecoLevel)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-poppins">
                  Member Since
                </p>
                <p className="font-medium text-gray-800">
                  {currentUser.createdAt
                    ? new Date(currentUser.createdAt).toLocaleDateString()
                    : "Recently"}
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Summary - Full Width */}
          <PurchaseSummary />

          {/* QR Code and Transactions Section */}
          <div className="mt-8">
            <QRTransactionsSection />
          </div>
        </div>
      </section>
      <Footer />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-section h1 {
            font-size: 2rem;
          }
          .dashboard-section .grid {
            gap: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .dashboard-section h1 {
            font-size: 1.3rem;
          }
          .dashboard-section .grid {
            grid-template-columns: 1fr;
          }
          .dashboard-section .grid > div {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
