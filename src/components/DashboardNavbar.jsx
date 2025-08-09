import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Group from "../assets/Group.png";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./DashboardNavbar.css";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEcoActivitiesOpen, setIsEcoActivitiesOpen] = useState(false);
  const [isCarbonCenterOpen, setIsCarbonCenterOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
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

  // Get user initials from name
  const getUserInitials = () => {
    if (!currentUser?.name) return "U";

    const nameParts = currentUser.name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  // Generate consistent background color based on user name
  const getUserColor = () => {
    if (!currentUser?.name) return "#10B981"; // Default green

    const colors = [
      "#10B981", // green
      "#3B82F6", // blue
      "#8B5CF6", // purple
      "#F59E0B", // amber
      "#EF4444", // red
      "#06B6D4", // cyan
      "#84CC16", // lime
      "#F97316", // orange
    ];

    let hash = 0;
    for (let i = 0; i < currentUser.name.length; i++) {
      hash = currentUser.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const ecoActivitiesItems = [
    { name: "Upload Receipt", path: "/upload-receipt" },
    { name: "Join Challenge", path: "/join-challenge" },
    { name: "Refer Friend", path: "/refer-friend" },
  ];

  const carbonCenterItems = [
    { name: "Record Planting", path: "/carbon-center/footprint" },
    { name: "Record Purchase", path: "/carbon-center/offset" },
    { name: "Log Transport", path: "/carbon-center/tips" },
  ];

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo and Navigation */}
        <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-12">
          {/* Logo */}
          <Link to="/" className="">
            <img
              src={Group}
              alt="Ecorewards Logo"
              className="Eco-Logo w-8 h-8"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6 md:space-x-2">
            <Link
              to="/"
              className="font-poppins text-gray-800 hover:text-green-600 text-sm md:text-sm lg:text-base whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`font-poppins text-gray-800 hover:text-green-600 text-sm md:text-sm lg:text-base whitespace-nowrap ${
                location.pathname === "/dashboard"
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Dashboard
            </Link>

            {/* Eco Activities Dropdown */}
            <div className="relative">
              <button
                className="font-poppins text-gray-800 hover:text-green-600 flex items-center gap-1 text-sm md:text-sm lg:text-base whitespace-nowrap"
                onClick={() => {
                  setIsEcoActivitiesOpen(!isEcoActivitiesOpen);
                  setIsCarbonCenterOpen(false);
                }}
              >
                Eco Activities
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isEcoActivitiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isEcoActivitiesOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 md:w-44 lg:w-48 bg-white rounded-md shadow-lg py-2">
                  {ecoActivitiesItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 md:px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 font-poppins text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Carbon Center Dropdown */}
            <div className="relative">
              <button
                className="font-poppins text-gray-800 hover:text-green-600 flex items-center gap-1 text-sm md:text-sm lg:text-base whitespace-nowrap"
                onClick={() => {
                  setIsCarbonCenterOpen(!isCarbonCenterOpen);
                  setIsEcoActivitiesOpen(false);
                }}
              >
                Carbon Center
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isCarbonCenterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCarbonCenterOpen && (
                <div className="absolute top-full left-0 mt-2 w-40 md:w-44 lg:w-48 bg-white rounded-md shadow-lg py-2">
                  {carbonCenterItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 md:px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 font-poppins text-sm"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/rewards"
              className={`font-poppins text-gray-800 hover:text-green-600 text-sm md:text-sm lg:text-base whitespace-nowrap ${
                location.pathname === "/rewards"
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className={`font-poppins text-gray-800 hover:text-green-600 text-sm md:text-sm lg:text-base whitespace-nowrap ${
                location.pathname === "/leaderboard"
                  ? "border-b-2 border-green-600"
                  : ""
              }`}
            >
              Leaderboard
            </Link>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* User Profile Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              aria-expanded={isUserDropdownOpen}
              aria-label="User menu"
            >
              {/* User Initials Circle */}
              <div
                className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-shadow duration-200"
                style={{ backgroundColor: getUserColor() }}
              >
                {getUserInitials()}
              </div>
              <ChevronDown
                size={14}
                className={`ml-1 text-gray-600 transition-transform duration-200 md:w-4 md:h-4 lg:w-5 lg:h-5 ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 md:w-52 lg:w-max bg-white rounded-lg shadow-lg py-3 z-50 border border-gray-100">
                {/* User Info Section */}
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: getUserColor() }}
                    >
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {currentUser?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {currentUser?.email}
                      </p>
                    </div>
                  </div>
                  {currentUser?.ecoLevel && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {currentUser.ecoLevel.charAt(0).toUpperCase() +
                          currentUser.ecoLevel.slice(1)}{" "}
                        Level
                      </span>
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors duration-200"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <span>View Profile</span>
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-green-600 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile User Info */}
            <div className="flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-md mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getUserColor() }}
              >
                {getUserInitials()}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {currentUser?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
                {currentUser?.ecoLevel && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-1">
                    {currentUser.ecoLevel.charAt(0).toUpperCase() +
                      currentUser.ecoLevel.slice(1)}{" "}
                    Level
                  </span>
                )}
              </div>
            </div>

            <Link
              to="/"
              className="block px-3 py-2 text-gray-800 font-poppins hover:bg-green-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`block px-3 py-2 text-gray-800 font-poppins rounded-md ${
                location.pathname === "/dashboard"
                  ? "bg-green-50"
                  : "hover:bg-green-50"
              }`}
            >
              Dashboard
            </Link>

            {/* Mobile Eco Activities */}
            <div>
              <button
                onClick={() => setIsEcoActivitiesOpen(!isEcoActivitiesOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-800 font-poppins hover:bg-green-50 rounded-md"
              >
                Eco Activities
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isEcoActivitiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isEcoActivitiesOpen && (
                <div className="pl-6">
                  {ecoActivitiesItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 font-poppins"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Carbon Center */}
            <div>
              <button
                onClick={() => setIsCarbonCenterOpen(!isCarbonCenterOpen)}
                className="w-full flex justify-between items-center px-3 py-2 text-gray-800 font-poppins hover:bg-green-50 rounded-md"
              >
                Carbon Center
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isCarbonCenterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCarbonCenterOpen && (
                <div className="pl-6">
                  {carbonCenterItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-3 py-2 text-gray-600 hover:text-green-600 font-poppins"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/rewards"
              className={`block px-3 py-2 text-gray-800 font-poppins rounded-md ${
                location.pathname === "/rewards"
                  ? "bg-green-50"
                  : "hover:bg-green-50"
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className={`block px-3 py-2 text-gray-800 font-poppins rounded-md ${
                location.pathname === "/leaderboard"
                  ? "bg-green-50"
                  : "hover:bg-green-50"
              }`}
            >
              Leaderboard
            </Link>

            {/* Mobile-only logout button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md w-full text-center mt-4 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
