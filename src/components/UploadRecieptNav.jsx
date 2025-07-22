import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  ChevronDown,
  Bell,
  Menu,
  X,
  Home,
  Upload,
  History,
  Users,
  Award,
} from 'lucide-react';
import Group from '../assets/Group.png';

function UploadRecieptNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { name: 'Home', to: '/', icon: <Home size={16} /> },
    { name: 'Dashboard', to: '/dashboard', icon: <Award size={16} /> },
    {
      name: 'Upload Receipt',
      to: '/upload-receipt',
      icon: <Upload size={16} />,
    },
    {
      name: 'Join Challenge',
      to: '/join-challenge',
      icon: <Award size={16} />,
    },
    { name: 'Refer Friend', to: '/refer-friend', icon: <Users size={16} /> },
    {
      name: 'Receipt History',
      to: '/receipt-history',
      icon: <History size={16} />,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target.id !== 'mobile-menu-button'
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsive mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo for mobile */}
          <div className="flex items-center lg:hidden">
            <img src={Group} alt="Ecorewards Logo" className="w-8 h-8" />
            <span className="text-xl font-regular font-itim ml-2">
              Ecorewards
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 overflow-x-auto py-2 scrollbar-hide">
            {navItems.map((item) =>
              item.to.startsWith('/') ? (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? 'text-eco-green border-b-2 border-eco-green pb-1'
                        : 'text-gray-600 hover:text-eco-green'
                    }`
                  }
                  aria-current={
                    location.pathname === item.to ? 'page' : undefined
                  }
                >
                  {item.name}
                </NavLink>
              ) : (
                <span
                  key={item.name}
                  className="text-sm font-medium text-gray-400 cursor-not-allowed opacity-60 whitespace-nowrap"
                >
                  {item.name}
                </span>
              )
            )}
          </div>

          {/* Right side: Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Shopping Cart Icon */}
            <button
              type="button"
              className="p-1.5 rounded-full text-gray-600 hover:text-eco-green hover:bg-gray-100 transition-colors duration-200"
              aria-label="View cart"
            >
              <ShoppingCart
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            </button>

            {/* User Profile Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center p-1.5 rounded-full text-gray-600 hover:text-eco-green hover:bg-gray-100 transition-colors duration-200"
                aria-label="User menu"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                aria-expanded={isUserDropdownOpen}
              >
                <User className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                <ChevronDown
                  className={`h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform duration-200 ${
                    isUserDropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 fade-in">
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green transition-colors duration-200"
                  >
                    Settings
                  </NavLink>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-eco-green transition-colors duration-200">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell Icon */}
            <Link
              to="/settings"
              onClick={(e) => {
                e.preventDefault();
                navigate('/settings', { state: { activeTab: 'notifications' } });
              }}
              className="text-gray-700 hover:text-eco-green-dark transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-button"
              type="button"
              className="lg:hidden p-1.5 rounded-full text-gray-600 hover:text-eco-green hover:bg-gray-100 transition-colors duration-200 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden bg-white border-t border-gray-100 shadow-inner slide-in-right"
        >
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-eco-green bg-green-50'
                      : 'text-gray-600 hover:text-eco-green hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default UploadRecieptNav;
