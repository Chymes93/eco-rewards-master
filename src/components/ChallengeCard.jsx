import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChallengeCard({
  id,
  title,
  task,
  duration,
  description,
  imageUrl,
  imageAlt,
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 h-full">
      {/* Card Header */}
      <div className="bg-green-600 text-white p-4 text-center">
        <h3 className="font-semibold text-lg font-poppins">{title}</h3>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Details */}
        <div className="mb-4 space-y-2 text-sm text-gray-700 font-poppins">
          <p>
            <span className="font-medium text-gray-800">Task:</span> {task}
          </p>
          <p>
            <span className="font-medium text-gray-800">Duration:</span>{' '}
            {duration}
          </p>
          <p>
            <span className="font-medium text-gray-800">Description:</span>{' '}
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="my-4 flex-grow flex items-center justify-center">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-h-48 w-auto object-contain"
            loading="lazy" // Add lazy loading for better performance
          />
        </div>

        {/* Join Button */}
        <div className="mt-auto pt-4">
          <button
            className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-semibold font-poppins hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            onClick={() => navigate(`/challenge/${id}`)}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
