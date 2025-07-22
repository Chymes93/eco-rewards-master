import React, { useState, useEffect } from 'react';
import './RewardsPage.css';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTimes } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactConfetti from 'react-confetti';
import discountIcon from '../assets/Discount.png';
import treeIcon from '../assets/Treehouse.png';
import windIcon from '../assets/Wind.png';
import giftIcon from '../assets/Box.png';
import recycleIcon from '../assets/Recycle.png';
import nairaIcon from '../assets/Naira.png';
import Hall1 from '../assets/Hall1.png';
import Hall2 from '../assets/Hall2.png';
import Hall3 from '../assets/Hall3.png';
import platinum from '../assets/Platinum.png';
import Gold from '../assets/Gold.png';
import Silver from '../assets/Silver.png';
import Bronze from '../assets/Bronze.png';
import Diamond from '../assets/Diamond.png';

// Constants
const LEVELS = [
  { name: 'Diamond', threshold: 0, icon: Diamond },
  { name: 'Bronze', threshold: 1000, icon: Bronze },
  { name: 'Silver', threshold: 2000, icon: Silver },
  { name: 'Gold', threshold: 3000, icon: Gold },
  { name: 'Platinum', threshold: 4000, icon: platinum },
];

const REWARDS = [
  {
    id: 1,
    title: '10% off Eco Friendly Products',
    points: 1500,
    description: 'Get 10% off selected eco-friendly products in partner stores',
    icon: discountIcon,
  },
  {
    id: 2,
    title: 'Help Plant a Tree',
    points: 3000,
    description:
      'Contribute to a tree planting initiative and make a positive environmental impact',
    icon: treeIcon,
  },
  {
    id: 3,
    title: 'Support Renewable Energy',
    points: 1000,
    description:
      'Click to donate your points to support a renewable energy project',
    icon: windIcon,
  },
  {
    id: 4,
    title: 'Secret Eco-Gift Box',
    points: 1500,
    description:
      'A surprise eco-friendly gift could be a bottle, tote, or more',
    icon: giftIcon,
  },
  {
    id: 5,
    title: 'Recycling Hero Badge',
    points: 2000,
    description: 'Show off your commitment to recycling with this badge',
    icon: recycleIcon,
  },
  {
    id: 6,
    title: '₦1,000 Off Your Next Order',
    points: 5000,
    description: 'Get ₦1,000 off purchases from partner eco-stores',
    icon: nairaIcon,
  },
];

// Components
const UserProfile = ({
  username,
  currentLevel,
  nextLevel,
  ecoPoints,
  progress,
  pointsProgress,
  pointsNeeded,
}) => (
  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10 flex flex-col md:flex-row items-center gap-8 hover:bg-opacity-10 transition-all duration-300">
    <div className="relative group cursor-pointer">
      <div className="w-32 h-32 rounded-full bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-10 flex items-center justify-center overflow-hidden group-hover:bg-opacity-20 transition-all duration-300">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          👤
        </span>
      </div>
      <div className="absolute -bottom-3 right-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img
          src={currentLevel.icon}
          alt={currentLevel.name}
          className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
    </div>

    <div className="text-center md:text-left flex-1">
      <h2 className="text-3xl font-light text-white mb-3 group">
        Welcome back,{' '}
        <span className="text-green-400 group-hover:text-green-300 transition-colors duration-300">
          {username}
        </span>
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="bg-white bg-opacity-5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300">
          <span className="text-sm text-white font-light tracking-wider">
            LEVEL {LEVELS.indexOf(currentLevel) + 1}
          </span>
          <span className="mx-2 text-white text-opacity-20">•</span>
          <span className="text-sm text-white font-light">
            {currentLevel.name}
          </span>
        </div>
      </div>

      <div className="w-full mb-6">
        <div className="flex justify-between text-sm text-white text-opacity-60 mb-2">
          <div className="flex items-center gap-2">
            <img
              src={currentLevel.icon}
              alt={currentLevel.name}
              className="w-5 h-5"
            />
            <span>{currentLevel.name}</span>
          </div>
          {nextLevel && (
            <div className="flex items-center gap-2">
              <img
                src={nextLevel.icon}
                alt={nextLevel.name}
                className="w-5 h-5"
              />
              <span>{nextLevel.name}</span>
            </div>
          )}
        </div>
        <div className="h-3 bg-white bg-opacity-10 rounded-full overflow-hidden group">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 ease-out group-hover:from-green-400 group-hover:to-green-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-white text-opacity-60">
            {pointsProgress} points
          </span>
          {nextLevel && (
            <span className="text-sm text-white text-opacity-60">
              {pointsNeeded} points needed
            </span>
          )}
        </div>
        {nextLevel && (
          <div className="text-center mt-2 text-sm text-green-400 hover:text-green-300 transition-colors duration-300">
            {pointsNeeded} more points until {nextLevel.name}
          </div>
        )}
      </div>
    </div>
  </div>
);

const StatsCard = ({ value, label, icon }) => (
  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10 flex justify-between items-center hover:bg-opacity-10 transition-all duration-300 group">
    <div>
      <div className="text-5xl font-light text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
        {value}
      </div>
      <div className="text-sm text-white text-opacity-60 font-light group-hover:text-opacity-80 transition-all duration-300">
        {label}
      </div>
    </div>
    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
  </div>
);

const HallOfFame = () => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-light text-white mb-4 hall-title">Hall of Fame</h2>
      <div className="w-16 h-1 bg-green-500 mx-auto"></div>
    </div>

    <div className="flex justify-center items-end gap-4 md:gap-8 hall-container">
      {/* Second Place */}
      <div className="relative group cursor-pointer">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-white bg-opacity-5 backdrop-blur-sm rounded-full border border-white border-opacity-10 flex flex-col items-center justify-center group-hover:bg-opacity-10 transition-all duration-300 hall-profile">
          <img
            src={Hall1}
            alt="Hall of Fame"
            className="mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300 hall-icon">
          <img
            src={Gold}
            alt="Hall of Fame"
            className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* First Place */}
      <div className="relative -mb-6 group cursor-pointer first-place">
        <div className="w-48 h-48 md:w-56 md:h-56 bg-white bg-opacity-5 backdrop-blur-sm rounded-full border border-white border-opacity-10 flex flex-col items-center justify-center group-hover:bg-opacity-10 transition-all duration-300 hall-profile">
          <img
            src={Hall2}
            alt="Hall of Fame"
            className="w-40 h-40 mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300 hall-icon">
          <img
            src={platinum}
            alt="Hall of Fame"
            className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Third Place */}
      <div className="relative group cursor-pointer">
        <div className="w-40 h-40 md:w-48 md:h-48 bg-white bg-opacity-5 backdrop-blur-sm rounded-full border border-white border-opacity-10 flex flex-col items-center justify-center group-hover:bg-opacity-10 transition-all duration-300 hall-profile">
          <img
            src={Hall3}
            alt="Hall of Fame"
            className="mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300 hall-icon">
          <img
            src={Silver}
            alt="Hall of Fame"
            className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>

    <div className="text-center mt-16">
      <Link
        to="/leaderboard"
        className="px-6 py-3 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-xl text-white text-sm font-light tracking-wider transition-all hover:text-green-400 hall-btn"
      >
        View Full Leaderboard
      </Link>
    </div>
  </div>
);


const RewardCard = ({ reward, ecoPoints, claimedRewards, onClaim }) => (
  <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-[400px] hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
    <img
      src={reward.icon}
      alt=""
      className="w-16 h-16 mb-6 hover:scale-110 transition-transform duration-300"
    />
    <p className="text-xl text-green-600 font-semibold mb-2">{reward.title}</p>
    <p className="text-lg text-green-600 font-medium mb-4">
      {reward.points} eco points
    </p>
    <p className="text-sm text-gray-600">{reward.description}</p>
    <button
      className={`w-full py-3 font-medium rounded-lg transition-all mt-auto ${
        claimedRewards.includes(reward.id)
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : ecoPoints >= reward.points
          ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
      }`}
      disabled={ecoPoints < reward.points || claimedRewards.includes(reward.id)}
      onClick={() => onClaim(reward)}
    >
      {claimedRewards.includes(reward.id) ? 'Claimed' : 'Claim now'}
    </button>
  </div>
);

const CallToAction = () => (
  <div className="mb-16">
    <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-12 border border-white border-opacity-10 text-center hover:bg-opacity-10 transition-all duration-300">
      <h2 className="text-2xl font-light text-white mb-6">
        Keep earning Eco-Points! Join challenges and make a difference!
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/challenges"
          className="px-8 py-3 bg-green-500 text-white font-light tracking-wider rounded-xl hover:bg-green-600 hover:scale-105 transition-all"
        >
          Explore Challenges
        </Link>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white bg-opacity-5 backdrop-blur-sm border-t border-white border-opacity-10 py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white text-opacity-60 font-light text-center sm:text-left">
          &copy; {new Date().getFullYear()} Ecorewards. All Rights Reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white text-opacity-60 font-light">
            Follow Us
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-opacity-60 hover:text-opacity-100 hover:text-green-400 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-opacity-60 hover:text-opacity-100 hover:text-green-400 transition-all"
              aria-label="Facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-opacity-60 hover:text-opacity-100 hover:text-green-400 transition-all"
              aria-label="Twitter"
            >
              <FaSquareXTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const ConfirmationModal = ({ show, reward, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-medium text-gray-800">Confirm Claim</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Are you sure you want to claim this reward?
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg font-medium text-gray-800 mb-2">
              {reward?.title}
            </p>
            <p className="text-green-600 font-medium">
              {reward?.points} eco points
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const RewardsPage = () => {
  const [ecoPoints, setEcoPoints] = useState(5000);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [streak, setStreak] = useState(15);
  const [badges, setBadges] = useState(7);
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || 'Walex14';
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();

    if (lastLoginDate !== today) {
      if (
        new Date(lastLoginDate).getTime() ===
        new Date(today).getTime() - 86400000
      ) {
        setStreak((prev) => prev + 1);
        if ((streak + 1) % 7 === 0) {
          setBadges((prev) => prev + 1);
          toast.success('🏆 New badge earned for 7 days streak!', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else if (lastLoginDate) {
        setStreak(1);
      }
      localStorage.setItem('lastLoginDate', today);
    }
  }, []);

  const currentLevel = LEVELS.reduce((acc, level) => {
    if (ecoPoints >= level.threshold) {
      return level;
    }
    return acc;
  }, LEVELS[0]);

  const nextLevelIndex =
    LEVELS.findIndex((level) => level.name === currentLevel.name) + 1;
  const nextLevel = LEVELS[nextLevelIndex] || null;

  const progress = nextLevel
    ? Math.min(
        Math.max(
          ((ecoPoints - currentLevel.threshold) /
            (nextLevel.threshold - currentLevel.threshold)) *
            100,
          0
        ),
        100
      )
    : 100;

  const pointsNeeded = nextLevel ? nextLevel.threshold - ecoPoints : 0;
  const pointsProgress = nextLevel ? ecoPoints - currentLevel.threshold : 0;

  const handleClaimReward = (reward) => {
    setSelectedReward(reward);
    setShowModal(true);
  };

  const confirmClaim = () => {
    if (selectedReward && ecoPoints >= selectedReward.points) {
      setEcoPoints((prev) => prev - selectedReward.points);
      setClaimedRewards((prev) => [...prev, selectedReward.id]);
      setShowConfetti(true);
      toast.success(`Successfully claimed ${selectedReward.title}!`, {
        position: 'top-right',
        autoClose: 3000,
      });
      setShowModal(false);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  };

  const cancelClaim = () => {
    setSelectedReward(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-light text-white mb-4">
              Your Eco Rewards
            </h1>
            <p className="text-lg text-green-200 font-light">
              Earn points. Redeem rewards. Make an impact!
            </p>
          </div>

          <UserProfile
            username={username}
            currentLevel={currentLevel}
            nextLevel={nextLevel}
            ecoPoints={ecoPoints}
            progress={progress}
            pointsProgress={pointsProgress}
            pointsNeeded={pointsNeeded}
          />
        </div>

        {/* User Stats */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatsCard value={streak} label="Current Streak" icon="🔥" />
            <StatsCard value={badges} label="Badges Claims" icon="⭐" />
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="max-w-5xl mx-auto mb-16">
          <HallOfFame />
        </div>

        {/* Available Rewards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-4">
              Redeem Rewards for Eco Friendly Choices
            </h2>
            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REWARDS.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                ecoPoints={ecoPoints}
                claimedRewards={claimedRewards}
                onClaim={handleClaimReward}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-5xl mx-auto mb-16">
          <CallToAction />
        </div>
      </div>

      <Footer />

      <ConfirmationModal
        show={showModal}
        reward={selectedReward}
        onConfirm={confirmClaim}
        onCancel={cancelClaim}
      />

      <ToastContainer />

      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
    </div>
  );
};

export default RewardsPage;
