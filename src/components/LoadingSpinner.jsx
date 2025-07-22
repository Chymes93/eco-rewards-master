import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', fullScreen = false }) => {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    styles[color],
    fullScreen ? styles.fullScreen : ''
  ].join(' ');

  return (
    <div className={spinnerClasses}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

export default LoadingSpinner;
