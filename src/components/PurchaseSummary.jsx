import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { FaStar, FaChartLine, FaChartBar } from 'react-icons/fa';

const data = [
  { name: 'Jan', amount: 200 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 250 },
  { name: 'Apr', amount: 400 },
  { name: 'May', amount: 450 },
  { name: 'Jun', amount: 500 },
  { name: 'Jul', amount: 600 },
];

const PurchaseSummary = () => {
  const [chartType, setChartType] = useState('area');
  const [chartHeight, setChartHeight] = useState(400);

  // Adjust chart height based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(300);
      } else {
        setChartHeight(400);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-bold font-poppins">
            Purchase Summary
          </h2>
          <FaStar className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                chartType === 'area'
                  ? 'bg-eco-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Show line chart"
              title="Line Chart"
            >
              <FaChartLine className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-1.5 rounded-md transition-colors duration-200 ${
                chartType === 'bar'
                  ? 'bg-eco-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Show bar chart"
              title="Bar Chart"
            >
              <FaChartBar className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-eco-green">
            ₦600
          </h3>
        </div>
      </div>

      <div className={`w-full h-[${chartHeight}px]`}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#6B7280',
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#6B7280',
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
                tickFormatter={(value) => `₦${value}`}
                dx={-10}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  padding: '12px',
                }}
                formatter={(value) => [`₦${value}`, 'Amount']}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
              />
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#22C55E"
                strokeWidth={2}
                fill="url(#colorAmount)"
                dot={{
                  stroke: '#22C55E',
                  strokeWidth: 2,
                  fill: '#fff',
                  r: window.innerWidth < 640 ? 3 : 4,
                }}
                activeDot={{
                  stroke: '#22C55E',
                  strokeWidth: 2,
                  fill: '#22C55E',
                  r: window.innerWidth < 640 ? 5 : 6,
                }}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#6B7280',
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#6B7280',
                  fontSize: window.innerWidth < 640 ? 10 : 12,
                }}
                tickFormatter={(value) => `₦${value}`}
                dx={-10}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  padding: '12px',
                }}
                formatter={(value) => [`₦${value}`, 'Amount']}
                labelStyle={{ color: '#374151', fontWeight: 600 }}
              />
              <Bar
                dataKey="amount"
                fill="#22C55E"
                radius={[4, 4, 0, 0]}
                barSize={window.innerWidth < 640 ? 15 : 30}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PurchaseSummary;
