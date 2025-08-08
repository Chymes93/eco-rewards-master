import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";
import { HelpCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
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
  }, []);

  // Update last refresh time
  const updateLastRefreshTime = () => {
    const now = new Date();
    setLastUpdated(
      `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`
    );
  };

  // Manual refresh function
  const handleRefresh = async () => {
    if (!currentUser?.token) {
      toast.error("Please log in again");
      navigate("/login");
      return;
    }

    setRefreshingData(true);
    toast.loading("Refreshing your data...");

    try {
      const result = await getCurrentUser();
      if (result.success) {
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

  // Mock data for features not yet implemented in backend
  const challengesCompleted = 1; // TODO: Get from API
  const badgesEarned = 3; // TODO: Get from API
  const ongoingStreak = 1; // TODO: Get from API
  const nextMilestone = 1; // TODO: Get from API

  // Format eco level for display
  const formatEcoLevel = (level) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

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
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshingData}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {refreshingData ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Refreshing...
                </>
              ) : (
                "Refresh"
              )}
            </button>
          </div>

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
                    Challenges <br />
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
                    Ongoing <br />
                    Streaked
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={missionIcon} alt="Flag" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {nextMilestone}
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

          {/* User Info Card - New Section */}
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
