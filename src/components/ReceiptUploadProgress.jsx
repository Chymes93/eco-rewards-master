import React from 'react';
import Document from '../assets/Document.png';

const ReceiptUploadProgress = ({ receipts }) => {
  return (
    <div className="space-y-4 mt-6">
      {receipts.map((receipt, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4 flex-grow">
            <div className="w-8 h-8">
              <img
                src={Document}
                alt="Document"
                className="w-full h-full"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {receipt.name}
                </span>
                <button
                  onClick={() => receipt.onRemove(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${receipt.progress}%` }}
                />
              </div>
            </div>
          </div>
          <span className="ml-4 text-sm text-gray-600">
            {receipt.progress}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReceiptUploadProgress;
