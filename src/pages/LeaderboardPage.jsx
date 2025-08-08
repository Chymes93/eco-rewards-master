import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Bell,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLeaderboard } from "../context/LeaderboardContext";
import Group from "../assets/Group.png";
import MiniFooter from "../components/MiniFooter";
import Trophy from "../assets/Trophy.png";

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
        {user.movement === "new" && (
          <span className="text-blue-500 text-xs ml-0.5">🆕</span>
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

// Loading skeleton for table rows
const TableRowSkeleton = () => (
  <tr className="border-b border-gray-100">
    <td className="py-3 px-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </td>
    <td className="py-3 px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </td>
    <td className="py-3 px-4 text-right">
      <div className="w-16 h-4 bg-gray-300 rounded animate-pulse ml-auto"></div>
    </td>
  </tr>
);

// Loading skeleton for mobile cards
const CardSkeleton = () => (
  <div className="bg-gray-200 rounded-xl p-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-16 h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const LeaderboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-gray-800 px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="container-responsive mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Group} alt="Ecorewards Logo" className="w-8 h-8" />
          <span className="text-xl font-regular font-itim">Ecorewards</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className="font-poppins text-gray-700 hover:text-eco-green transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="font-poppins text-gray-700 hover:text-eco-green transition-colors duration-200"
          >
            Dashboard
          </Link>
          <Link
            to="/rewards"
            className="font-poppins text-gray-700 hover:text-eco-green transition-colors duration-200"
          >
            Rewards
          </Link>
          <Link
            to="/leaderboard"
            className="font-poppins text-eco-green border-b-2 border-eco-green"
          >
            Leaderboard
          </Link>
          <Link
            to="/community"
            className="font-poppins text-gray-700 hover:text-eco-green transition-colors duration-200"
          >
            Community
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-eco-green transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* User Profile Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-gray-700 hover:text-eco-green transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              aria-expanded={isUserDropdownOpen}
              aria-label="User menu"
            >
              <User className="w-5 h-5" />
              <ChevronDown
                className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 fade-in">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green transition-colors duration-200"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link
            to="/settings"
            onClick={(e) => {
              e.preventDefault();
              navigate("/settings", { state: { activeTab: "notifications" } });
            }}
            className="text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-eco-green transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-6 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="font-poppins text-gray-700 hover:text-eco-green py-2 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="font-poppins text-gray-700 hover:text-eco-green py-2 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/rewards"
              className="font-poppins text-gray-700 hover:text-eco-green py-2 transition-colors duration-200"
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className="font-poppins text-eco-green py-2 border-b border-eco-green"
            >
              Leaderboard
            </Link>
            <Link
              to="/community"
              className="font-poppins text-gray-700 hover:text-eco-green py-2 transition-colors duration-200"
            >
              Community
            </Link>

            {/* Mobile-only logout button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 hover:text-eco-green hover:bg-gray-100 rounded-md w-full text-center mt-4 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const LeaderboardPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("rank"); // 'rank', 'points', 'name'
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc', 'desc'
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Get leaderboard data from context
  const { leaderboard, loading, error, fetchLeaderboard } = useLeaderboard();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load data on component mount
  useEffect(() => {
    if (leaderboard.length === 0) {
      fetchLeaderboard(1, 50); // Load more data for full leaderboard page
    }
  }, []);

  // Filter and sort data
  const processedData = leaderboard
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "rank") {
        return sortDirection === "asc" ? a.rank - b.rank : b.rank - a.rank;
      } else if (sortOrder === "points") {
        return sortDirection === "asc"
          ? a.points - b.points
          : b.points - a.points;
      } else if (sortOrder === "name") {
        return sortDirection === "asc"
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username);
      }
      return 0;
    });

  const toggleSort = (field) => {
    if (sortOrder === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortOrder(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortOrder === field) {
      return sortDirection === "asc" ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LeaderboardNavbar />
      <div className="bg-eco-green py-8 sm:py-16 px-4 flex-grow">
        <div className="container-responsive mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-4xl font-bold text-eco-green">
                Leaderboard
              </h2>
              <img
                src={Trophy}
                alt="Trophy"
                className="w-8 h-8 sm:w-12 sm:h-12"
              />
            </div>

            <div className="w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:border-eco-green focus:ring-1 focus:ring-eco-green text-gray-700 text-sm sm:text-base"
                />
                <button
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-eco-green p-1.5 sm:p-2 mr-1 sm:mr-2 rounded-full hover:bg-eco-green-dark transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="text-white text-sm sm:text-base" />
                </button>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Error loading leaderboard: {error}
              </p>
              <button
                onClick={() => fetchLeaderboard(1, 50)}
                className="px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Desktop Table View */}
          {!isMobile && !error && (
            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th
                      className="py-3 px-4 text-left text-sm sm:text-base font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("rank")}
                    >
                      <div className="flex items-center gap-1">
                        Rank
                        {getSortIcon("rank")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-left text-sm sm:text-base font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("name")}
                    >
                      <div className="flex items-center gap-1">
                        User
                        {getSortIcon("name")}
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-right text-sm sm:text-base font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort("points")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Eco Points
                        {getSortIcon("points")}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <>
                      {[...Array(10)].map((_, index) => (
                        <TableRowSkeleton key={index} />
                      ))}
                    </>
                  )}
                  {!loading &&
                    processedData.map((user) => (
                      <tr
                        key={`${user.rank}-${user.username}`}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="py-3 px-4 flex items-center gap-2">
                          <span className="font-semibold text-gray-800">
                            {user.rank}
                          </span>
                          {user.movement === "up" && (
                            <span className="text-green-500 text-sm">▲</span>
                          )}
                          {user.movement === "down" && (
                            <span className="text-red-500 text-sm">▼</span>
                          )}
                          {user.movement === "new" && (
                            <span className="text-blue-500 text-sm">🆕</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user.avatar}
                              alt={`${user.username}'s avatar`}
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                              loading="lazy"
                            />
                            <span className="font-medium text-gray-800">
                              {user.username}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-eco-green">
                          {user.points?.toLocaleString()} pts
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Card View */}
          {isMobile && !error && (
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-2 px-2">
                <button
                  onClick={() => toggleSort("rank")}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-eco-green transition-colors duration-200"
                >
                  Sort by Rank {getSortIcon("rank")}
                </button>
                <button
                  onClick={() => toggleSort("points")}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-eco-green transition-colors duration-200"
                >
                  Sort by Points {getSortIcon("points")}
                </button>
              </div>

              {loading && (
                <>
                  {[...Array(10)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </>
              )}

              {!loading &&
                processedData.map((user) => (
                  <LeaderboardCard
                    key={`mobile-${user.rank}-${user.username}`}
                    user={user}
                  />
                ))}
            </div>
          )}

          {/* No Results Message */}
          {!loading && !error && processedData.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No users found matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && leaderboard.length === 0 && !searchQuery && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No leaderboard data available
              </p>
              <button
                onClick={() => fetchLeaderboard(1, 50)}
                className="px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Load Leaderboard
              </button>
            </div>
          )}
        </div>
      </div>
      <MiniFooter />
    </div>
  );
};

export default LeaderboardPage;
