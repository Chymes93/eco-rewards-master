import React from 'react';
import { FaRecycle } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { IoStatsChartSharp } from 'react-icons/io5';

const RewardsSection = () => {
  const rewardCards = [
    {
      icon: <FaRecycle className="text-4xl text-green-600" />,
      title: 'Every action counts!',
      description: 'Reduce waste, recycle, and support a cleaner future.',
    },
    {
      icon: <BsCart4 className="text-4xl text-green-600" />,
      title: 'Get discounts & exclusive deals',
      description: 'just for making green choices!',
    },
    {
      icon: <IoStatsChartSharp className="text-4xl text-green-600" />,
      title: 'Climb the leaderboard',
      description: 'join challenges, and unlock bonus rewards!',
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#228B22]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12 font-poppins">
          Make a Difference. Get Rewarded
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-green-50 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-poppins">
                {card.title}
              </h3>
              <p className="text-gray-600 font-poppins">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
