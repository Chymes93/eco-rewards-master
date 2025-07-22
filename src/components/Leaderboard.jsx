import React from 'react';
import Trophy from '../assets/Trophy.png';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const leaderboardData = [
  {
    rank: 1,
    username: 'GreenWarrior92',
    points: 3500,
    movement: 'up',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenWarrior92',
  },
  {
    rank: 2,
    username: 'EcoHero_Tobi',
    points: 3200,
    movement: 'up',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EcoHero_Tobi',
  },
  {
    rank: 3,
    username: 'EcoHero_Tobi',
    points: 3200,
    movement: 'none',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EcoHero_Tobi',
  },
  {
    rank: 4,
    username: 'RecycleKing_Lagos',
    points: 2600,
    movement: 'none',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RecycleKing_Lagos',
  },
  {
    rank: 5,
    username: 'SustainableQueen',
    points: 2780,
    movement: 'down',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SustainableQueen',
  },
  {
    rank: 6,
    username: 'CarbonFootprint_X',
    points: 1800,
    movement: 'none',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarbonFootprint_X',
  },
  {
    rank: 7,
    username: 'ZeroWasteAda',
    points: 2200,
    movement: 'down',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZeroWasteAda',
  },
  {
    rank: 8,
    username: 'GreenLifestyle',
    points: 1700,
    movement: 'up',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenLifestyle',
  },
];

// Mobile card view for leaderboard entries
const LeaderboardCard = ({ user }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border-l-4 border-eco-green">
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-700 font-semibold">
        {user.rank}
        {user.movement === 'up' && (
          <span className="text-green-500 text-xs ml-0.5">▲</span>
        )}
        {user.movement === 'down' && (
          <span className="text-red-500 text-xs ml-0.5">▼</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt={`${user.username}'s avatar`}
          className="w-8 h-8 rounded-full object-cover"
          loading="lazy"
        />
        <span className="font-medium text-sm">{user.username}</span>
      </div>
    </div>
    <div className="text-right font-medium text-eco-green">
      {user.points.toLocaleString()} pts
    </div>
  </div>
);

const Leaderboard = () => {
  // Show only top 5 in the landing page
  const topUsers = leaderboardData.slice(0, 5);

  return (
    <section className="bg-eco-black py-12 sm:py-16">
      <div className="container-responsive mx-auto px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-eco-green font-poppins">
              Leaderboard
            </h2>
            <img
              src={Trophy}
              alt="Trophy"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>

          {/* Desktop Table View - Hidden on Mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-3 px-4 text-left text-gray-600">Rank</th>
                  <th className="py-3 px-4 text-left text-gray-600">User</th>
                  <th className="py-3 px-4 text-right text-gray-600">
                    Eco point
                  </th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-3 px-4 flex items-center gap-1">
                      {user.rank}
                      {user.movement === 'up' && (
                        <span className="text-green-500">▲</span>
                      )}
                      {user.movement === 'down' && (
                        <span className="text-red-500">▼</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={user.avatar}
                          alt={`${user.username}'s avatar`}
                          className="w-8 h-8 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span className="font-medium">{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-eco-green">
                      {user.points.toLocaleString()} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View - Shown only on Mobile */}
          <div className="sm:hidden space-y-3">
            {topUsers.map((user) => (
              <LeaderboardCard key={user.rank} user={user} />
            ))}
          </div>

          {/* View Full Leaderboard Button */}
          <div className="mt-6 text-center">
            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-eco-green text-white rounded-full hover:bg-green-600 transition-colors duration-200 text-sm font-medium"
            >
              View Full Leaderboard
              <FaChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
