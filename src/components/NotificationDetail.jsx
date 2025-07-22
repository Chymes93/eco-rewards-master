import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import MiniFooter from './MiniFooter';
import Remove from '../assets/Remove.png';

const notificationDetails = {
  1: {
    description: (
      <>
        <span className="block font-bold text-xl sm:text-2xl mb-2">Congratulations!</span>
        <span className="block text-base sm:text-lg font-medium mb-6 sm:mb-8">
          You just earned Eco-points for your recent activity. Keep it up and
          stay green!
        </span>
      </>
    ),
    button: {
      text: 'View Rewards',
      action: (navigate) => navigate('/rewards'),
    },
  },
  2: {
    description: (
      <>
        <p className="font-semibold text-base sm:text-lg mt-6 sm:mt-8">
          New challenges just dropped!
        </p>
        <p className="text-base sm:text-lg font-semibold">
          Take on a fresh challenge and rack up those Eco-points while helping
          the planet.
        </p>
      </>
    ),
    button: {
      text: 'Join challenge',
      action: (navigate) => navigate('/join-challenge'),
    },
  },
  3: {
    description: (
      <>
        <span className="block font-bold text-xl sm:text-2xl mb-2">
          You have unlocked a new tier!
        </span>
        <span className="block text-base sm:text-lg font-medium mb-6 sm:mb-8">
          Check it out in your rewards section and claim your new benefits.
        </span>
      </>
    ),
    button: {
      text: 'View Rewards',
      action: (navigate) => navigate('/rewards'),
    },
  },
  4: {
    description: (
      <>
        <span className="block font-bold text-xl sm:text-2xl mb-2">
          Challenge Reminder
        </span>
        <span className="block text-base sm:text-lg font-medium mb-6 sm:mb-8">
          Don't forget your challenge! Complete it today to earn Eco-points.
        </span>
      </>
    ),
    button: {
      text: 'Go to Challenges',
      action: (navigate) => navigate('/join-challenge'),
    },
  },
};

const NotificationDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notification = location.state?.notification;

  // Mark as read on mount if not already
  useEffect(() => {
    if (notification && !notification.read) {
      // Optionally, you could update global state or call an API here
      notification.read = true;
    }
  }, [notification]);

  if (!notification) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg">Notification not found.</p>
          <button
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg"
            onClick={() =>
              navigate('/settings', { state: { activeTab: 'notifications' } })
            }
          >
            Go Back
          </button>
        </div>
        <MiniFooter />
      </div>
    );
  }

  const details = notificationDetails[notification.id] || {
    description: (
      <span className="block text-lg font-medium mb-8">
        No additional details for this notification.
      </span>
    ),
    button: null,
  };

  // Format date
  const date = new Date(notification.date);
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DashboardNavbar />
      <div className="flex-1 flex flex-col items-center px-4 py-4 sm:py-6 md:px-0 md:py-12">
        <div className="w-full max-w-xl mx-auto bg-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <button
              className="text-2xl text-black hover:text-green-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center bg-gray-100 rounded-full"
              onClick={() =>
                navigate('/settings', { state: { activeTab: 'notifications' } })
              }
              aria-label="Back"
            >
              &lt;
            </button>
            <button
              className="hover:scale-110 transform min-h-[44px] min-w-[44px] flex items-center justify-center bg-gray-100 rounded-full"
              title="Delete notification"
              onClick={() =>
                navigate('/settings', {
                  state: {
                    activeTab: 'notifications',
                    deleteId: notification.id,
                  },
                })
              }
            >
              <img
                src={Remove}
                alt="Delete"
                className="w-7 h-7 object-contain"
              />
            </button>
          </div>
          <div className="flex items-center gap-3 mb-4 mt-4">
            <div className="bg-black text-white rounded-full w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center">
              <img
                src={notification.icon}
                alt="icon"
                className="w-7 h-7 object-contain"
              />
            </div>
            <h5 className="font-semibold text-base sm:text-lg flex items-center flex-wrap">
              <span className="text-black text-2xl mr-2">•</span>{' '}
              {notification.title}
            </h5>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 text-sm mb-6 sm:mb-8 gap-2">
            <span className="text-xs sm:text-sm break-words">{notification.message}</span>
            <span className="text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded-full self-start">{formattedDate}</span>
          </div>
          <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 text-left">{details.description}</div>
          {details.button && (
            <div className="flex justify-center w-full">
              <button
                className="bg-black text-white px-6 sm:px-10 py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-900 transition-transform duration-300 w-full sm:w-auto"
                onClick={() => details.button.action(navigate)}
              >
                {details.button.text}
              </button>
            </div>
          )}
        </div>
      </div>
      <MiniFooter />
    </div>
  );
};

export default NotificationDetail;
