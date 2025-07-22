import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Group from '../assets/Group.png';
import { ShoppingCart, User, Bell, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEcoActivitiesOpen, setIsEcoActivitiesOpen] = useState(false);
  const [isCarbonCenterOpen, setIsCarbonCenterOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const ecoActivitiesItems = [
    { name: 'Upload Receipt', path: '/upload-receipt' },
    { name: 'Join Challenge', path: '/join-challenge' },
    { name: 'Refer Friend', path: '/refer-friend' },
  ];

  const carbonCenterItems = [
    { name: 'Record Planting', path: '/carbon-center/footprint' },
    { name: 'Record Purchase', path: '/carbon-center/offset' },
    { name: 'Log Transport', path: '/carbon-center/tips' },
  ];

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo and Navigation */}
        <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-12">
          {/* Logo */}
          <Link to="/" className="">
            <img src={Group} alt="Ecorewards Logo" className="Eco-Logo w-8 h-8" />
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
                location.pathname === '/dashboard'
                  ? 'border-b-2 border-green-600'
                  : ''
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
                    isEcoActivitiesOpen ? 'rotate-180' : ''
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
                    isCarbonCenterOpen ? 'rotate-180' : ''
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
                location.pathname === '/rewards'
                  ? 'border-b-2 border-green-600'
                  : ''
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className={`font-poppins text-gray-800 hover:text-green-600 text-sm md:text-sm lg:text-base whitespace-nowrap ${
                location.pathname === '/leaderboard'
                  ? 'border-b-2 border-green-600'
                  : ''
              }`}
            >
              Leaderboard
            </Link>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <Link
            to="/dashboard"
            className="text-gray-600 hover:text-green-600 p-1.5 md:p-2 rounded-full hover:bg-gray-100"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Link>

          {/* User Profile Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center text-gray-600 hover:text-green-600 p-1.5 md:p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              aria-expanded={isUserDropdownOpen}
              aria-label="User menu"
            >
              <User size={20} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <ChevronDown
                size={14}
                className={`ml-1 transition-transform duration-200 md:w-4 md:h-4 lg:w-5 lg:h-5 ${
                  isUserDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 md:w-44 lg:w-48 bg-white rounded-lg shadow-lg py-2 z-50 fade-in">
                <Link
                  to="/settings"
                  className="block px-3 md:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 md:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200"
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
              navigate('/settings', { state: { activeTab: 'notifications' } });
            }}
            className="text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-1.5 md:p-2 rounded-full hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-green-600 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            <Link
              to="/"
              className="block px-3 py-2 text-gray-800 font-poppins hover:bg-green-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`block px-3 py-2 text-gray-800 font-poppins rounded-md ${
                location.pathname === '/dashboard'
                  ? 'bg-green-50'
                  : 'hover:bg-green-50'
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
                    isEcoActivitiesOpen ? 'rotate-180' : ''
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
                    isCarbonCenterOpen ? 'rotate-180' : ''
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
                location.pathname === '/rewards'
                  ? 'bg-green-50'
                  : 'hover:bg-green-50'
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className={`block px-3 py-2 text-gray-800 font-poppins rounded-md ${
                location.pathname === '/leaderboard'
                  ? 'bg-green-50'
                  : 'hover:bg-green-50'
              }`}
            >
              Leaderboard
            </Link>

            {/* Mobile-only logout button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-100 rounded-md w-full text-center mt-4 transition-colors duration-200"
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
