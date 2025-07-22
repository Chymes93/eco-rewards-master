import React from 'react';
import MiniFooter from './MiniFooter';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#228B22] flex flex-col justify-between">
      <div className="flex flex-1 items-center justify-center py-12 px-2 md:px-0">
        <div className="relative bg-white rounded-2xl shadow-lg max-w-2xl w-full px-6 md:px-12 py-10 md:py-14">
          {/* Lock Icon */}
          <div className="flex justify-center mb-4">
            <svg
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-[#228B22]"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="9"
                rx="2"
                fill="#228B22"
                opacity="0.1"
              />
              <path
                stroke="#228B22"
                strokeWidth="2"
                d="M7 10V7a5 5 0 0110 0v3"
              />
              <rect
                x="5"
                y="10"
                width="14"
                height="9"
                rx="2"
                stroke="#228B22"
                strokeWidth="2"
              />
              <circle cx="12" cy="15" r="1.5" fill="#228B22" />
            </svg>
          </div>
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Privacy Policy
          </h1>
          {/* Policy Text */}
          <div className="text-gray-800 text-sm md:text-base space-y-5 font-poppins">
            <p>
              At Ecorewards, we prioritize the privacy and security of our
              users’ data, in full compliance with international and national
              data protection laws. For users based in the UK, we comply with
              the UK GDPR and Data Protection Act 2018, ensuring personal data
              is processed lawfully, fairly, and transparently. For Nigerian
              users, Ecorewards adheres to the Nigeria Data Protection Act
              (NDPA) under the supervision of the Nigeria Data Protection
              Commission (NDPC).
            </p>
            <p>
              User data collected—including names, emails, phone numbers, and
              eco-activity logs—is used solely to personalize rewards, track
              eco-friendly behaviors, and improve user experience. Data is
              stored securely using industry-grade encryption and will not be
              sold or shared with third parties without consent.
            </p>
            <p>
              Occasionally, we may contact users via email or SMS for updates on
              new features, campaigns, or eco-initiatives. Users will have the
              option to opt in or out of such communications.
            </p>
            <p>
              Ecorewards commits to transparency and data integrity. Users can
              request to access, update, or delete their personal data at any
              time. We continuously review our data practices to maintain the
              highest standards of privacy protection.
            </p>
            <p>
              By using our platform, you consent to this policy. Updates to this
              policy will be communicated through official channels.
            </p>
          </div>
          {/* Accept Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-black text-white px-10 py-3 rounded-md font-semibold hover:bg-gray-900 transition">
              ACCEPT
            </button>
          </div>
        </div>
      </div>
      <MiniFooter />
    </div>
  );
};

export default PrivacyPolicy;
