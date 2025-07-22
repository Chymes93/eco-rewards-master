import React from 'react';
import styles from './SponsorsSection.module.css';
import Pepsi from '../assets/Pepsi.png';
import Cola from '../assets/Cola.png';
import Wheel from '../assets/Wheel.png';
import Eco from '../assets/Eco.png';

const SponsorsSection = () => {
  return (
    <section className={styles.sponsorsSection}>
      <h2 className='font-poppins'>Our sponsors</h2>
      <div className={styles.sponsorsGrid}>
        <div className={styles.sponsorItem}>
          <img src={ Pepsi } alt="Pepsi" />
        </div>
        <div className={styles.sponsorItem}>
          <img src={ Cola } alt="Coca-Cola" />
        </div>
        <div className={styles.sponsorItem}>
          <img src={ Wheel } alt="Sponsor 3" />
        </div>
        <div className={styles.sponsorItem}>
          <img src={ Eco } alt="Eco" />
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
