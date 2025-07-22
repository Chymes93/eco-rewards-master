import React, { useState, useEffect } from 'react';
import { FaCopy } from 'react-icons/fa';
import Refer from '../assets/Refer.png';
import styles from './ReferFriend.module.css';
import Whatsapp from '../assets/Whatsapp.png';
import SMS from '../assets/SMS.png';
import Options from '../assets/Options.png';


function ReferFriendSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'http://ecoreward-/efer-friend/ecor12345';
  const [imgSrc, setImgSrc] = useState(Refer);
  // If the image fails to load, use this placeholder that matches the design
  const fallbackImgSrc =
    'https://placehold.co/600x400/f0f0f0/4ade80?text=Refer+Friends+Illustration';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageError = () => {
    setImgSrc(fallbackImgSrc);
  };

  // Add useEffect to handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      // Adjust UI based on screen size if needed
    };

    // Check if the referral link is visible on the screen
    const checkLinkVisibility = () => {
      const linkElement = document.querySelector(`.${styles.referralLink}`);
      if (linkElement && !copied) {
        // Highlight the link field briefly to draw attention
        linkElement.classList.add('highlight-pulse');
        setTimeout(() => {
          linkElement.classList.remove('highlight-pulse');
        }, 1500);
      }
    };

    window.addEventListener('resize', handleResize);

    // Add a slight delay before highlighting the link field
    const timer = setTimeout(checkLinkVisibility, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <section className="py-8 md:py-12">
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Top Section: Header + Image side by side */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-10">
          {/* Header Section */}
          <div className="w-full md:w-1/2 md:pr-4">
            <h1 className={`${styles.title} text-left md:text-left`}>
              Invite & <br className="hidden sm:inline" />
              Earn Rewards
            </h1>
            <p className={`${styles.subtitle} text-left md:text-left mt-4`}>
              Share Ecorewards with friends, and earn eco-points for every
              successful referral!
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={imgSrc}
              alt="Refer friends illustration"
              className="w-full h-auto max-w-md mx-auto"
              onError={handleImageError}
            />
          </div>
        </div>

        {/* Bottom Section: Referral Link and Social Options */}
        <div className="mt-8 md:mt-12">
          {/* Referral Link Section */}
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center font-poppins">
                Your Referral Link
              </h2>
              <div className={styles.referralLinkContainer}>
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className={styles.referralLink}
                />
                <button
                  onClick={handleCopyLink}
                  className={styles.copyButton}
                  aria-label="Copy link"
                >
                  {copied ? (
                    <span className="text-green-600 font-medium px-2">
                      Copied!
                    </span>
                  ) : (
                    <FaCopy className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center font-poppins">
                Or Invite Via
              </h2>
              <div className={styles.socialOptions}>
                <a
                  href={`https://wa.me/?text=Join%20me%20on%20Ecorewards%20and%20earn%20rewards%20for%20eco-friendly%20actions!%20${encodeURIComponent(
                    referralLink
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialOption}
                >
                  <div
                    className={`${styles.socialIconContainer} ${styles.whatsapp}`}
                  >
                    <img src={Whatsapp} alt="Whatsapp" />
                  </div>
                  <span className={styles.socialLabel}>Whatsapp</span>
                </a>

                <a
                  href={`sms:?body=Join%20me%20on%20Ecorewards%20and%20earn%20rewards%20for%20eco-friendly%20actions!%20${encodeURIComponent(
                    referralLink
                  )}`}
                  className={styles.socialOption}
                >
                  <div
                    className={`${styles.socialIconContainer} ${styles.sms}`}
                  >
                    <img src={SMS} alt="SMS" />
                  </div>
                  <span className={styles.socialLabel}>SMS</span>
                </a>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Join me on Ecorewards',
                        text: 'Join me on Ecorewards and earn rewards for eco-friendly actions!',
                        url: referralLink,
                      });
                    } else {
                      alert('Web Share API not supported in your browser');
                    }
                  }}
                  className={styles.socialOption}
                >
                  <div
                    className={`${styles.socialIconContainer} ${styles.other}`}
                  >
                    <img src={Options} alt="Other Options" />
                  </div>
                  <span className={styles.socialLabel}>Other Options</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReferFriendSection;
