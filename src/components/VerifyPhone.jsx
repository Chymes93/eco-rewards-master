import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const VerifyPhone = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  
  const { verifyOTP, loading, authError, tempUserData, resendOTP } = useAuth();
  const inputRefs = useRef([]);
  
  // Set up countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);
  
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus the last input
      inputRefs.current[5].focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length === 6) {
      await verifyOTP(otpString);
    }
  };
  
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setResendLoading(true);
    setResendMessage('');
    
    const result = await resendOTP();
    
    if (result.success) {
      setTimeLeft(60);
      setCanResend(false);
      setResendMessage('OTP resent successfully');
    }
    
    setResendLoading(false);
  };
  
  // Format phone number for display
  const formatPhone = (phone) => {
    if (!phone) return '';
    
    // Assuming phone is in format +234XXXXXXXX
    const lastDigits = phone.slice(-8);
    return `+234 ${lastDigits.slice(0, 4)} ${lastDigits.slice(4)}`;
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
          <h2 className={styles.authTitle}>Verify Your Phone</h2>
          <p className={styles.authSubtitle}>
            We've sent a verification code to<br />
            <strong>{formatPhone(tempUserData?.phone)}</strong>
          </p>
          
          {authError && (
            <div className={styles.errorMessage} role="alert">
              {authError}
            </div>
          )}
          
          {resendMessage && (
            <div className="text-green-600 text-center mb-4">
              {resendMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className={styles.otpInput}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  required
                />
              ))}
            </div>
            
            <div className={styles.resendLink}>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className={styles.authLink}
                  disabled={resendLoading}
                >
                  {resendLoading ? 'Sending...' : 'Resend Code'}
                </button>
              ) : (
                <span>
                  Resend code in <strong>{timeLeft}</strong> seconds
                </span>
              )}
            </div>
            
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading || otp.join('').length !== 6}
            >
              {loading ? <LoadingSpinner size="small" color="white" /> : 'Verify'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <Link to="/signup" className={styles.authLink}>
              Change Phone Number
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhone;
