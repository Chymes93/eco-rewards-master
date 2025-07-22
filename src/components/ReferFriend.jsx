import React from 'react';
import UploadRecieptNav from './UploadRecieptNav';
import ReferFriendSection from './ReferFriendSection';
import MiniFooter from './MiniFooter';
import styles from './ReferFriend.module.css';

const ReferFriend = () => {
  return (
    <div className={styles.uploadContainer}>
      <UploadRecieptNav />

      <main className={styles.mainContent}>
        <ReferFriendSection />
      </main>

      <MiniFooter />
    </div>
  );
};

export default ReferFriend;
