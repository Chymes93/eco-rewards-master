import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import LoadingSpinner from './LoadingSpinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll just show a success message
      setSuccess(true);
    } catch (error) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authImageSection}>
          <div className={styles.authImageContent}>
            {/* Image content can be added here */}
          </div>
        </div>
        
        <div className={styles.authFormSection}>
          <h2 className={styles.authTitle}>Forgot Password</h2>
          <p className={styles.authSubtitle}>
            Enter your email and we'll send you a link to reset your password
          </p>
          
          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}
          
          {success ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                Password reset link has been sent to your email.
                Please check your inbox.
              </div>
              
              <Link to="/login" className={styles.authLink}>
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? <LoadingSpinner size="small" color="white" /> : 'Send Reset Link'}
              </button>
              
              <div className="text-center mt-6">
                <Link to="/login" className={styles.authLink}>
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
