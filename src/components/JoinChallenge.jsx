import React from 'react';
import UploadRecieptNav from './UploadRecieptNav';
import JoinChallengeSection from './JoinChallengeSection';
import MiniFooter from './MiniFooter';
import styles from './UploadReceipt.module.css'; // Reusing the same styles

const JoinChallenge = () => {
  return (
    <div className={styles.uploadContainer}>
      <UploadRecieptNav />
      
      <main className={styles.mainContent}>
        <JoinChallengeSection />
      </main>

      <MiniFooter />
    </div>
  );
};

export default JoinChallenge;
