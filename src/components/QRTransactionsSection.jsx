import React, { useState } from 'react';
import { IoChevronForward, IoScan } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const QRTransactionsSection = () => {
  const [isQRActive, setIsQRActive] = useState(false);

  const transactions = [
    { activity: 'Reusable Bags', points: 32, time: '7:03pm', date: 'Today' },
    {
      activity: 'Tree Planting',
      points: 32,
      time: '7:03pm',
      date: 'Yesterday',
    },
    {
      activity: 'Refurbished Electronics',
      points: 32,
      time: '7:03pm',
      date: '02 Apr, 2025',
    },
    {
      activity: 'Renewable Energy',
      points: 32,
      time: '7:03pm',
      date: '26 Mar, 2025',
    },
  ];

  const handleQRClick = () => {
    setIsQRActive(true);
    // In a real app, this would activate the camera for QR scanning
    setTimeout(() => {
      setIsQRActive(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8">
        {/* QR Code Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-poppins text-center">
            Scan QR Codes
          </h2>
          <motion.div
            className={`bg-eco-green w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-xl sm:rounded-2xl flex items-center justify-center p-4 mb-4 cursor-pointer relative overflow-hidden ${
              isQRActive ? 'ring-4 ring-white' : ''
            }`}
            onClick={handleQRClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isQRActive && (
              <motion.div
                className="absolute inset-0 bg-white opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
              />
            )}
            <div className="relative w-full h-full">
              {/* QR Code corners */}
              <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-l-4 border-t-4 border-gray-700"></div>
              <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-r-4 border-t-4 border-gray-700"></div>
              <div className="absolute bottom-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-l-4 border-b-4 border-gray-700"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-r-4 border-b-4 border-gray-700"></div>

              {/* QR Code pattern (simplified) */}
              <div className="absolute inset-8 grid grid-cols-3 gap-2">
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
                <div className="bg-white"></div>
              </div>

              {/* Scan Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black bg-opacity-40 rounded-full p-4 sm:p-3">
                  <IoScan className="text-white w-8 h-8 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </motion.div>
          <p className="text-center text-gray-600 text-sm sm:text-base font-poppins mt-2 mb-2">
            Scan QR codes on Eco-Friendly products
            <br />
            and earn points
          </p>
          <button
            className="mt-4 bg-eco-green text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-eco-green-dark transition-colors duration-200 flex items-center"
            onClick={handleQRClick}
          >
            <IoScan className="mr-2" />
            Scan QR Code
          </button>
        </div>

        {/* Recent Transactions Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 font-poppins">
            Recent Transactions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 sm:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
              >
                <div>
                  <h3 className="font-semibold text-base sm:text-lg font-poppins">
                    {transaction.activity}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-poppins">
                    {transaction.time}, {transaction.date}
                  </p>
                </div>
                <div className="text-eco-green font-semibold font-poppins text-base sm:text-lg">
                  {transaction.points} pts
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/receipt-history"
            className="text-eco-green font-semibold flex items-center mt-4 hover:underline font-poppins text-sm sm:text-base transition-colors duration-200"
          >
            View older transactions
            <IoChevronForward className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QRTransactionsSection;
