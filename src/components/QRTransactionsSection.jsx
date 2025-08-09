import React, { useState } from "react";
import { IoChevronForward, IoScan } from "react-icons/io5";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useActivities } from "../context/ActivitiesContext";
import { useAuth } from "../context/AuthContext";

const QRTransactionsSection = () => {
  const [isQRActive, setIsQRActive] = useState(false);
  const { currentUser } = useAuth();
  const {
    recentActivities,
    loading,
    scanningQR,
    fetchRecentActivities,
    simulateQRScan,
    hasActivities,
  } = useActivities();

  const handleQRClick = async () => {
    if (!currentUser) {
      toast.error("Please log in to scan QR codes");
      return;
    }

    if (scanningQR) {
      toast.error("Already scanning a QR code. Please wait...");
      return;
    }

    setIsQRActive(true);

    // Show scanning feedback
    toast.loading("Opening camera for QR scanning...", { id: "qr-scan" });

    try {
      // Simulate camera opening delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.dismiss("qr-scan");
      toast.loading("Processing QR code...", { id: "qr-process" });

      // Use the simulateQRScan function from context
      const result = await simulateQRScan();

      toast.dismiss("qr-process");

      if (!result.success) {
        // Error toast is already shown in the context
        console.error("QR scan failed:", result.error);
      }
      // Success toast is already shown in the context
    } catch (error) {
      toast.dismiss(["qr-scan", "qr-process"]);
      toast.error("Failed to process QR scan");
      console.error("QR scan error:", error);
    } finally {
      setIsQRActive(false);
    }
  };

  // Loading skeleton for transactions
  const TransactionSkeleton = () => (
    <div className="space-y-3 sm:space-y-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse py-3 sm:py-4 border-b border-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* QR Code Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-poppins text-center">
            Scan QR Codes
          </h2>
          <motion.div
            className={`bg-eco-green w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-xl sm:rounded-2xl flex items-center justify-center p-4 mb-4 cursor-pointer relative overflow-hidden ${
              isQRActive || scanningQR ? "ring-4 ring-white" : ""
            }`}
            onClick={handleQRClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {(isQRActive || scanningQR) && (
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
              />
            )}
            <div className="relative w-full h-full">
              {/* QR Code corners */}
              <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-l-4 border-t-4 border-gray-700"></div>
              <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-r-4 border-t-4 border-gray-700"></div>
              <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-l-4 border-b-4 border-gray-700"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-r-4 border-b-4 border-gray-700"></div>

              {/* QR Code pattern */}
              <div className="absolute inset-8 grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-white"></div>
                ))}
              </div>

              {/* Scan Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-40 rounded-full p-4 sm:p-3">
                  <IoScan className="text-white w-8 h-8 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Active scanning animation */}
              {(isQRActive || scanningQR) && (
                <motion.div
                  className="absolute inset-0 border-4 border-yellow-400 rounded-xl"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </motion.div>
          <p className="text-center text-gray-600 text-sm sm:text-base font-poppins mt-2 mb-2">
            Scan QR codes on Eco-Friendly products
            <br />
            and earn points
          </p>
          <button
            className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
              isQRActive || scanningQR
                ? "bg-yellow-500 text-white cursor-not-allowed"
                : "bg-eco-green text-white hover:bg-eco-green-dark active:scale-95"
            }`}
            onClick={handleQRClick}
            disabled={isQRActive || scanningQR}
          >
            <IoScan className="mr-2" />
            {isQRActive || scanningQR ? "Scanning..." : "Scan QR Code"}
          </button>
        </div>

        {/* Recent Activities Section */}
        <div>
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold font-poppins">
              Recent Activities
            </h2>
            <button
              onClick={() => fetchRecentActivities(4, true)}
              className="text-eco-green hover:text-eco-green-dark transition-colors duration-200 text-sm font-medium"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Loading State */}
          {loading && <TransactionSkeleton />}

          {/* Empty State */}
          {!loading && !hasActivities && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌱</div>
              <p className="text-gray-500 mb-4 font-poppins">
                No activities yet!
              </p>
              <p className="text-sm text-gray-400 font-poppins">
                Start by scanning QR codes or completing eco-friendly activities
                to see them here.
              </p>
              <button
                onClick={handleQRClick}
                className="mt-4 px-4 py-2 bg-eco-green text-white rounded-full hover:bg-eco-green-dark transition-colors font-poppins text-sm"
              >
                Scan Your First QR Code
              </button>
            </div>
          )}

          {/* Activities List */}
          {!loading && hasActivities && (
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.slice(0, 4).map((activity, index) => (
                <div
                  key={`${activity.activityType}-${index}`}
                  className="flex justify-between items-center py-3 sm:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200 group"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-base sm:text-lg font-poppins group-hover:text-eco-green transition-colors">
                      {activity.activity}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-poppins">
                      {activity.time}, {activity.date}
                    </p>
                    {activity.description && (
                      <p className="text-gray-400 text-xs mt-1 hidden sm:block">
                        {activity.description}
                      </p>
                    )}
                    {activity.partner && (
                      <p className="text-eco-green text-xs mt-1 font-medium">
                        📍 {activity.partner}
                      </p>
                    )}
                  </div>
                  <div className="text-eco-green font-semibold font-poppins text-base sm:text-lg flex items-center">
                    +{activity.points} pts
                    {activity.activityType === "qr_scan" && (
                      <span className="ml-2 text-xs bg-eco-green text-white px-2 py-1 rounded-full">
                        QR
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Link */}
          {!loading && hasActivities && (
            <Link
              to="/activity-history"
              className="text-eco-green font-semibold flex items-center mt-4 hover:underline font-poppins text-sm sm:text-base transition-colors duration-200 group"
            >
              View all activities
              <IoChevronForward className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRTransactionsSection;
