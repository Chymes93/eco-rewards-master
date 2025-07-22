import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import DashboardNavbar from './DashboardNavbar';
import MiniFooter from './MiniFooter';
import Small from '../assets/Small.png';
import Remove from '../assets/Remove.png';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const fileInputRef = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState('account'); // 'account' or 'password'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check for activeTab in location state (passed from Navbar)
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

  // State for password section
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // State for account information section
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');

  // Original values for form reset and change tracking
  const [originalValues, setOriginalValues] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    address: '',
    bio: '',
  });

  // State for notifications section
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Eco-points Earned',
      message: 'You just earned 1200 Eco-points! Keep it up and stay green',
      date: new Date().toISOString(),
      read: true,
      icon: Small,
    },
    {
      id: 2,
      title: 'New Challenges Available',
      message: 'New eco challenges are live! Tap to join and earn points.',
      date: new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toISOString(),
      read: false,
      icon: Small,
    },
    {
      id: 3,
      title: 'Rewards Unlocked',
      message:
        'You have unlocked a new tier! Check it out in your rewards section.',
      date: new Date(
        new Date().setDate(new Date().getDate() - 3)
      ).toISOString(),
      read: false,
      icon: Small,
    },
    {
      id: 4,
      title: 'Challenge Reminders',
      message:
        'Do not forget your challenge! Complete it today to earn Eco-points.',
      date: new Date(
        new Date().setDate(new Date().getDate() - 3)
      ).toISOString(),
      read: false,
      icon: Small,
    },
  ]);

  // Edit state management
  const [isEditing, setIsEditing] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    if (field === 'old') {
      setOldPasswordVisible(!oldPasswordVisible);
    } else if (field === 'new') {
      setNewPasswordVisible(!newPasswordVisible);
    } else if (field === 'confirm') {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  // Handle profile image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Trigger file input click
  const handleSelectPicture = () => {
    fileInputRef.current.click();
  };

  // Notification Functions
  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark a notification as unread
  const markAsUnread = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Handle input changes and track if form has changed
  const handleInputChange = (setter, field, value) => {
    setter(value);

    // Check if current field has changed from its original value
    const hasChanged =
      field === 'name'
        ? value !== originalValues.name
        : field === 'email'
        ? value !== originalValues.email
        : field === 'username'
        ? value !== originalValues.username
        : field === 'phone'
        ? value !== originalValues.phone
        : field === 'address'
        ? value !== originalValues.address
        : field === 'bio'
        ? value !== originalValues.bio
        : false;

    // Check if any other fields have changed
    const otherFieldsChanged =
      (field !== 'name' && name !== originalValues.name) ||
      (field !== 'email' && email !== originalValues.email) ||
      (field !== 'username' && username !== originalValues.username) ||
      (field !== 'phone' && phone !== originalValues.phone) ||
      (field !== 'address' && address !== originalValues.address) ||
      (field !== 'bio' && bio !== originalValues.bio);

    setIsFormChanged(hasChanged || otherFieldsChanged);
  };

  // Enable editing mode
  const handleEdit = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsEditing(true);
  };

  // Cancel editing and reset form values to original state
  const handleCancel = (e) => {
    e.preventDefault(); // Prevent form submission
    setName(originalValues.name);
    setEmail(originalValues.email);
    setUsername(originalValues.username);
    setPhone(originalValues.phone);
    setAddress(originalValues.address);
    setBio(originalValues.bio);
    setIsEditing(false);
    setIsFormChanged(false);
  };

  // Handle form submissions
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add password update logic here
    alert('Password updated successfully!');
  };

  const handleAccountInfoSubmit = (e) => {
    e.preventDefault();

    if (!isFormChanged) {
      // If no changes were made, just exit edit mode
      setIsEditing(false);
      return;
    }

    // Update original values with current values
    setOriginalValues({
      name,
      email,
      username,
      phone,
      address,
      bio,
    });

    // Exit edit mode and reset form changed state
    setIsEditing(false);
    setIsFormChanged(false);

    // Add account info update logic here (API call, etc.)
    alert('Account information updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardNavbar />
      <div className="flex flex-1">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="w-64 border-r border-gray-200 bg-white px-4 py-6 hidden md:block">
          <div className="flex flex-col items-center justify-center pt-8 pb-6">
            {profileImage ? (
              <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={profileImage}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold mb-4">
                {name
                  ? name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2)
                  : '?'}
              </div>
            )}
            <h3 className="text-lg font-bold text-center">
              {name ? name.toUpperCase() : 'USER PROFILE'}
            </h3>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'account'
                  ? 'text-gray-600 font-semibold'
                  : 'text-gray-600'
              } rounded-md hover:bg-green-600 hover:text-white`}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Account Information
            </button>

            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'password'
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-600'
              } rounded-md hover:bg-green-600 hover:text-white`}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reset Password
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'notifications'
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-600'
              } rounded-md hover:bg-green-600 hover:text-white`}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M13.87 3.2C13.56 3.11 13.24 3.04 12.9 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.36 20.64 9.02 19.88 9.02 19.06"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
              Notifications
            </button>

            <button
              onClick={() => setActiveTab('help')}
              className={`flex items-center w-full px-4 py-2 ${
                activeTab === 'help'
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-600'
              } rounded-md hover:bg-green-600 hover:text-white`}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 17H12.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Help & Support
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-600 rounded-md hover:bg-green-600 hover:text-white"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12H3.62"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.85 8.65039L2.5 12.0004L5.85 15.3504"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Mobile Menu Button and Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-semibold">
              {activeTab === 'account' && 'Account Information'}
              {activeTab === 'password' && 'Reset Password'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'help' && 'Help & Support'}
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 top-3 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu - Only visible on mobile when open */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-lg p-4 mb-6 animate-fade-in-down">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('account');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 ${
                    activeTab === 'account'
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-600'
                  } rounded-md hover:bg-green-600 hover:text-white transition-all duration-200`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Account Information
                </button>

                <button
                  onClick={() => {
                    setActiveTab('password');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 ${
                    activeTab === 'password'
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-600'
                  } rounded-md hover:bg-green-600 hover:text-white transition-all duration-200`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reset Password
                </button>

                <button
                  onClick={() => {
                    setActiveTab('notifications');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 ${
                    activeTab === 'notifications'
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-600'
                  } rounded-md hover:bg-green-600 hover:text-white transition-all duration-200`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.02 2.91C8.71 2.91 6.02 5.6 6.02 8.91V11.8C6.02 12.41 5.76 13.34 5.45 13.86L4.3 15.77C3.59 16.95 4.08 18.26 5.38 18.7C9.69 20.14 14.34 20.14 18.65 18.7C19.86 18.3 20.39 16.87 19.73 15.77L18.58 13.86C18.28 13.34 18.02 12.41 18.02 11.8V8.91C18.02 5.61 15.32 2.91 12.02 2.91Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.87 3.2C13.56 3.11 13.24 3.04 12.9 3C11.95 2.88 11.03 2.95 10.17 3.2C10.46 2.46 11.18 1.94 12.02 1.94C12.86 1.94 13.58 2.46 13.87 3.2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.02 19.06C15.02 20.71 13.67 22.06 12.02 22.06C11.2 22.06 10.44 21.72 9.9 21.18C9.36 20.64 9.02 19.88 9.02 19.06"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                  </svg>
                  Notifications
                </button>

                <button
                  onClick={() => {
                    setActiveTab('help');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 ${
                    activeTab === 'help'
                      ? 'text-green-600 font-semibold'
                      : 'text-gray-600'
                  } rounded-md hover:bg-green-600 hover:text-white transition-all duration-200`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Help & Support
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-600 rounded-md hover:bg-green-600 hover:text-white transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H3.62"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.85 8.65039L2.5 12.0004L5.85 15.3504"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Password Reset Tab */}
          {activeTab === 'password' && (
            <div>
              <form
                onSubmit={handlePasswordSubmit}
                className="max-w-md mx-auto"
              >
                {/* Old Password */}
                <div className="mb-4 relative">
                  <input
                    type={oldPasswordVisible ? 'text' : 'password'}
                    placeholder="Old password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('old')}
                    className="absolute right-3 top-3 text-gray-500"
                    tabIndex="-1"
                  >
                    {oldPasswordVisible ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                {/* New Password */}
                <div className="mb-4 relative">
                  <input
                    type={newPasswordVisible ? 'text' : 'password'}
                    placeholder="New password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-3 text-gray-500"
                    tabIndex="-1"
                  >
                    {newPasswordVisible ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="mb-6 relative">
                  <input
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-3 text-gray-500"
                    tabIndex="-1"
                  >
                    {confirmPasswordVisible ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                >
                  Save
                </button>
              </form>
            </div>
          )}

          {/* Account Information Tab */}
          {activeTab === 'account' && (
            <div>
              {/* Profile Picture Section - Only visible on mobile */}
              <div className="md:hidden flex flex-col items-center justify-center mb-8">
                {profileImage ? (
                  <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center overflow-hidden mb-4">
                    <img
                      src={profileImage}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {name
                      ? name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .toUpperCase()
                          .substring(0, 2)
                      : '?'}
                  </div>
                )}
                <h3 className="text-lg font-bold text-center">
                  {name ? name.toUpperCase() : 'USER PROFILE'}
                </h3>
              </div>

              <form
                onSubmit={(e) => {
                  if (isEditing) {
                    handleAccountInfoSubmit(e);
                  } else {
                    e.preventDefault();
                  }
                }}
                className="max-w-3xl mx-auto"
              >
                {/* Profile Picture Upload */}
                <div className="w-full mb-6">
                  <div className="w-full mx-auto max-w-md">
                    <div
                      className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 mb-6"
                      style={{ borderColor: '#0C90E1' }}
                    >
                      <div className="text-gray-500 mb-6">
                        <svg
                          width="90"
                          height="90"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="4"
                            y="4"
                            width="16"
                            height="16"
                            rx="3"
                            stroke="#888888"
                            strokeWidth="1"
                          />
                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="1.5"
                            stroke="#888888"
                            strokeWidth="1"
                          />
                          <path
                            d="M4 16L9 11L15 17"
                            stroke="#888888"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 10L16 14"
                            stroke="#888888"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M14 12L18 12"
                            stroke="#888888"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 font-medium text-lg">
                          Upload your profile picture
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          JPG, PNG, (Max 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                        accept="image/jpeg, image/png"
                      />
                      <button
                        type="button"
                        onClick={handleSelectPicture}
                        className="mt-4 bg-white border border-gray-300 rounded-lg px-10 py-2.5 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Select picture
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Full Name */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                          handleInputChange(setName, 'name', e.target.value)
                        }
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full pl-10 p-3"
                        placeholder="Full Name"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                          handleInputChange(setEmail, 'email', e.target.value)
                        }
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full pl-10 p-3"
                        placeholder="Enter your email"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                          handleInputChange(
                            setUsername,
                            'username',
                            e.target.value
                          )
                        }
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full pl-10 p-3"
                        placeholder="user Name"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none space-x-1">
                        <div className="flex items-center">
                          <img
                            src="https://flagcdn.com/w20/ng.png"
                            alt="Nigeria flag"
                            className="w-5 h-auto mr-1"
                          />
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9995 17.5L11.9995 6.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.75 12.75L11.9999 8.5L16.25 12.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          handleInputChange(setPhone, 'phone', e.target.value)
                        }
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full pl-16 p-3"
                        placeholder="Enter your phone number"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) =>
                      handleInputChange(setAddress, 'address', e.target.value)
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-3"
                    placeholder="Contact Address"
                    disabled={!isEditing}
                  />
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <textarea
                    value={bio}
                    onChange={(e) =>
                      handleInputChange(setBio, 'bio', e.target.value)
                    }
                    rows="4"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-3"
                    placeholder="Bio"
                    disabled={!isEditing}
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
                  {!isEditing ? (
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="md:w-1/3 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="submit"
                        className="md:flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="md:flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <button
                  onClick={markAllAsRead}
                  className="flex items-center text-green-600 hover:text-green-700 transition-colors bg-green-50 px-3 py-2 rounded-lg text-sm sm:text-base min-h-[44px] min-w-[44px] sm:bg-transparent sm:px-2 sm:py-1"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Mark all as read
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300">
                {notifications.length === 0 ? (
                  <div className="text-center py-12 animate-pulse">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-6-6H6a6 6 0 00-6 6v3.159c0 .538.214 1.055.595 1.436L2 17h5m0 0l3 3m-3-3h6"
                      ></path>
                    </svg>
                    <p className="mt-4 text-gray-500 text-lg">
                      No notifications yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      New notifications will appear here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={`border-b pb-2 sm:pb-4 last:border-b-0 last:pb-0 hover:bg-white rounded-lg p-2 sm:p-3 transition-all duration-300 transform hover:-translate-y-1 ${
                          notification.read ? '' : 'bg-blue-50 bg-opacity-40'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-2">
                          <div className="flex items-start">
                            {notification.read ? (
                              <button
                                onClick={() => markAsUnread(notification.id)}
                                className="mr-2 text-green-600 flex-shrink-0 mt-1 hover:text-green-800 transition-colors duration-200 hover:scale-110 transform min-h-[44px] min-w-[44px] flex items-center justify-center"
                                title="Mark as unread"
                              >
                                <svg
                                  className="w-6 h-6 sm:w-5 sm:h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="mr-2 text-gray-500 flex-shrink-0 mt-1 hover:text-green-600 transition-colors duration-200 hover:scale-110 transform min-h-[44px] min-w-[44px] flex items-center justify-center"
                                title="Mark as read"
                              >
                                <svg
                                  className="w-6 h-6 sm:w-5 sm:h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            )}

                            <div className="flex-shrink-0 mr-2 sm:mr-3">
                              <div className="bg-gray-400 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden p-1 shadow-sm hover:shadow transition-all duration-300 hover:bg-gray-500">
                                <img
                                  src={notification.icon}
                                  alt="Trophy"
                                  className="w-7 h-7 object-contain animate-pulse"
                                />
                              </div>
                            </div>

                            <div
                              className="group cursor-pointer flex-1 overflow-hidden"
                              onClick={() =>
                                navigate(
                                  `/notifications-detail/${notification.id}`,
                                  {
                                    state: { notification },
                                  }
                                )
                              }
                            >
                              <div className="flex items-center flex-wrap">
                                <h5 className="font-semibold group-hover:text-green-600 transition-colors duration-300 text-sm sm:text-base break-words">
                                  {notification.title}
                                </h5>
                                {!notification.read && (
                                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-green-500 animate-ping opacity-75"></span>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1 group-hover:text-gray-900 transition-colors duration-300 break-words line-clamp-2 sm:line-clamp-none">
                                {notification.message}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                            <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors duration-300 order-2 sm:order-1">
                              {new Date(notification.date).toLocaleDateString(
                                'en-US',
                                {
                                  weekday: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )}
                            </span>
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="hover:scale-110 transform order-1 sm:order-2 sm:ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                              title="Delete notification"
                            >
                              <img
                                src={Remove}
                                alt="Delete"
                                className="w-7 h-7 object-contain"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Help & Support Tab */}
          {activeTab === 'help' && (
            <div>
              <p className="text-gray-600">
                Help and support options will be added here.
              </p>
            </div>
          )}
        </div>
      </div>
      <MiniFooter />
    </div>
  );
};

export default Settings;
