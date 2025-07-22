import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Group from '../assets/Group.png';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, Bell, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target.id !== 'menu-toggle'
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

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
            className={`font-poppins ${
              isActivePath('/')
                ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                : 'text-gray-700 hover:text-eco-green-dark transition-colors duration-200'
            }`}
          >
            Home
          </Link>

          {/* Dashboard link only shown when logged in */}
          {currentUser && (
            <Link
              to="/dashboard"
              className={`font-poppins ${
                isActivePath('/dashboard')
                  ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                  : 'text-gray-700 hover:text-eco-green-dark transition-colors duration-200'
              }`}
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/rewards"
            className={`font-poppins ${
              isActivePath('/rewards')
                ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                : 'text-gray-700 hover:text-eco-green-dark transition-colors duration-200'
            }`}
          >
            Rewards
          </Link>
          <Link
            to="/leaderboard"
            className={`font-poppins ${
              isActivePath('/leaderboard')
                ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                : 'text-gray-700 hover:text-eco-green-dark transition-colors duration-200'
            }`}
          >
            Leaderboard
          </Link>
          <Link
            to="/community"
            className={`font-poppins ${
              isActivePath('/community')
                ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                : 'text-gray-700 hover:text-eco-green-dark transition-colors duration-200'
            }`}
          >
            Community
          </Link>
        </div>

        {/* User Actions */}
        {/* Desktop User Actions (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Link>
              {/* User Profile Icon with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  aria-expanded={isUserDropdownOpen}
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown
                    className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                      isUserDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 fade-in">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green-dark transition-colors duration-200"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green-dark transition-colors duration-200"
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
                  navigate('/settings', {
                    state: { activeTab: 'notifications' },
                  });
                }}
                className="text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-eco-green-dark border border-gray-300 hover:border-eco-green rounded-md text-center transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green-dark text-center transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white py-4 px-6 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`font-poppins ${
                isActivePath('/')
                  ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                  : 'text-gray-700 hover:text-eco-green-dark py-2 transition-colors duration-200'
              }`}
            >
              Home
            </Link>
            {currentUser && (
              <Link
                to="/dashboard"
                className={`font-poppins ${
                  isActivePath('/dashboard')
                    ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                    : 'text-gray-700 hover:text-eco-green-dark py-2 transition-colors duration-200'
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/rewards"
              className={`font-poppins ${
                isActivePath('/rewards')
                  ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                  : 'text-gray-700 hover:text-eco-green-dark py-2 transition-colors duration-200'
              }`}
            >
              Rewards
            </Link>
            <Link
              to="/leaderboard"
              className={`font-poppins ${
                isActivePath('/leaderboard')
                  ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                  : 'text-gray-700 hover:text-eco-green-dark py-2 transition-colors duration-200'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/community"
              className={`font-poppins ${
                isActivePath('/community')
                  ? 'text-eco-green-dark border-b-2 border-eco-green-dark'
                  : 'text-gray-700 hover:text-eco-green-dark py-2 transition-colors duration-200'
              }`}
            >
              Community
            </Link>
            {/* Show login/signup in mobile menu if logged out */}
            {!currentUser && (
              <div className="flex flex-col gap-3 mt-2">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-gray-700 hover:text-eco-green-dark border border-gray-300 hover:border-eco-green rounded-md text-center transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="w-full px-4 py-2 bg-eco-green text-white rounded-md hover:bg-eco-green-dark text-center transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {currentUser && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-eco-green-dark hover:bg-gray-100 rounded-md w-full text-center mt-4 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
