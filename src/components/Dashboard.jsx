import React, { useState } from 'react';
import '../index.css';
import { HelpCircle } from 'lucide-react';
import DashboardNavbar from './DashboardNavbar';
import PurchaseSummary from './PurchaseSummary';
import QRTransactionsSection from './QRTransactionsSection';
import Footer from './Footer';

// Import images
import giftIcon from '../assets/Gift.png';
import badgeIcon from '../assets/Badge.png';
import fireIcon from '../assets/Fire.png';
import missionIcon from '../assets/Mission.png';

const Dashboard = () => {
  // Placeholder user data
  const [ecoPoints, setEcoPoints] = useState(1000);
  const [challengesCompleted] = useState(1);
  const [badgesEarned] = useState(3);
  const [ongoingStreak] = useState(1);
  const [nextMilestone] = useState(1);
  const [lastUpdated] = useState('30min ago');

  const handleExchange = () => {
    alert('Exchange functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <section className="dashboard-section px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
            Hey! Regina Louis
          </h1>
          <p className="text-gray-500 mb-8 font-poppins">
            Update {lastUpdated}
          </p>

          {/* Stats and Points Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-8 justify-between">
            {/* Left: Stats */}
            <div className="grid grid-cols-2 gap-6 w-full lg:max-w-[640px]">
              <div className="bg-white rounded-xl shadow-xl  p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={giftIcon} alt="Gift box" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {challengesCompleted}
                  </span>
                  <span className="text-black font-poppins">
                    Challenges <br />
                    Completed
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={badgeIcon} alt="Badge" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {badgesEarned}
                  </span>
                  <span className="text-black font-poppins">
                    Badges <br />
                    Earned
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={fireIcon} alt="Fire" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {ongoingStreak}
                  </span>
                  <span className="text-black font-poppins">
                    Ongoing <br />
                    Streaked
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-xl p-6 flex flex-row items-center min-w-[140px] hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 flex items-center justify-center mr-4">
                  <img src={missionIcon} alt="Flag" className="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-poppins">
                    {nextMilestone}
                  </span>
                  <span className="text-black font-poppins">
                    Next <br />
                    Milestone
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Points & Exchange */}
            <div className="bg-black text-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full lg:w-[400px] min-w-[300px] self-start">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-poppins">Points earned</span>
                <HelpCircle
                  size={20}
                  className="text-white/70 cursor-pointer"
                  title="Eco points are earned by completing challenges and eco activities."
                />
              </div>
              <span className="text-6xl font-bold font-poppins mb-2">
                {ecoPoints}
              </span>
              <span className="text-xl font-poppins mb-6">Eco points</span>
              <button
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-xl rounded-lg font-poppins transition duration-300"
                onClick={handleExchange}
              >
                Exchange
              </button>
            </div>
          </div>

          {/* Purchase Summary - Full Width */}
          <PurchaseSummary />

          {/* QR Code and Transactions Section */}
          <div className="mt-8">
            <QRTransactionsSection />
          </div>
        </div>
      </section>
      <Footer />
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .dashboard-section h1 {
            font-size: 2rem;
          }
          .dashboard-section .grid {
            gap: 1.5rem;
          }
        }
        @media (max-width: 480px) {
          .dashboard-section h1 {
            font-size: 1.3rem;
          }
          .dashboard-section .grid {
            grid-template-columns: 1fr;
          }
          .dashboard-section .grid > div {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
