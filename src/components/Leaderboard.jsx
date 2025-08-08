import React, { useEffect } from "react";
import Trophy from "../assets/Trophy.png";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLeaderboard } from "../context/LeaderboardContext";

// Mobile card view for leaderboard entries
const LeaderboardCard = ({ user }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-eco-green">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-700 font-semibold">
        {user.rank}
        {user.movement === "up" && (
          <span className="text-green-500 text-xs ml-0.5">▲</span>
        )}
        {user.movement === "down" && (
          <span className="text-red-500 text-xs ml-0.5">▼</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          className="w-8 h-8 rounded-full object-cover"
          loading="lazy"
        />
        <span className="font-medium text-sm">{user.username}</span>
      </div>
    </div>
    <div className="text-right font-medium text-eco-green">
      {user.points?.toLocaleString()} pts
    </div>
  </div>
);

// Loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-3 p-4 border-b border-gray-50"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="flex-1 bg-gray-300 h-4 rounded"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    ))}
  </div>
);

const Leaderboard = () => {
  const { leaderboard, loading, error, fetchLeaderboard, getTopUsers } =
    useLeaderboard();

  // Get top 5 users for display
  const topUsers = getTopUsers(5);

  // Refresh data on component mount if no data
  useEffect(() => {
    if (leaderboard.length === 0) {
      fetchLeaderboard();
    }
  }, []);

  return (
    <section className="bg-eco-black py-12 sm:py-16">
      <div className="container-responsive mx-auto px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-eco-green font-poppins">
              Leaderboard
            </h2>
            <img
              src={Trophy}
              alt="Trophy"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Error loading leaderboard: {error}
              </p>
              <button
                onClick={() => fetchLeaderboard()}
                className="px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && !error && (
            <div className="hidden sm:block">
              <LoadingSkeleton />
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && topUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No leaderboard data available
              </p>
              <button
                onClick={() => fetchLeaderboard()}
                className="px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Load Leaderboard
              </button>
            </div>
          )}

          {/* Desktop Table View - Hidden on Mobile */}
          {!loading && !error && topUsers.length > 0 && (
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="py-3 px-4 text-left text-gray-600">Rank</th>
                    <th className="py-3 px-4 text-left text-gray-600">User</th>
                    <th className="py-3 px-4 text-right text-gray-600">
                      Eco point
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user) => (
                    <tr
                      key={`${user.rank}-${user.username}`}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 flex items-center gap-1">
                        {user.rank}
                        {user.movement === "up" && (
                          <span className="text-green-500">▲</span>
                        )}
                        {user.movement === "down" && (
                          <span className="text-red-500">▼</span>
                        )}
                        {user.movement === "new" && (
                          <span className="text-blue-500">🆕</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={user.avatar}
                            alt={`${user.username}'s avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                            loading="lazy"
                          />
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-eco-green">
                        {user.points?.toLocaleString()} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View - Shown only on Mobile */}
          {!loading && !error && topUsers.length > 0 && (
            <div className="sm:hidden space-y-3">
              {topUsers.map((user) => (
                <LeaderboardCard
                  key={`mobile-${user.rank}-${user.username}`}
                  user={user}
                />
              ))}
            </div>
          )}

          {/* Loading state for mobile */}
          {loading && !error && (
            <div className="sm:hidden space-y-3">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-xl p-4 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View Full Leaderboard Button */}
          {!loading && !error && topUsers.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
              >
                View Full Leaderboard
                <FaChevronRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
