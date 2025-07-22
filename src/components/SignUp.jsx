import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css';
import NigeriaFlag from '../assets/nigeria-flag.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [verificationMethod, setVerificationMethod] = useState('email'); // 'email' or 'phone'

  const { signup, loading, authError, setAuthError } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (verificationMethod === 'email') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }
    } else {
      if (!phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{8,}$/.test(phone)) {
        newErrors.phone = 'Phone number must be at least 8 digits';
      }
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    if (validateForm()) {
      const userData = {
        fullName,
        password,
      };

      if (verificationMethod === 'email') {
        userData.email = email;
      } else {
        userData.phone = `+234${phone}`;
      }

      await signup(userData);
    }
  };

  const handleSocialSignup = (provider) => {
    // In a real app, this would integrate with social login providers
    alert(`${provider} signup would be implemented here`);
  };

  const toggleVerificationMethod = () => {
    setVerificationMethod(verificationMethod === 'email' ? 'phone' : 'email');
    setErrors({});
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
          <h2 className={styles.authTitle}>Sign Up</h2>
          <p className={styles.authSubtitle}>
            Already have an account?{' '}
            <Link to="/login" className={styles.authLink}>
              Login
            </Link>
          </p>

          {authError && (
            <div className={styles.errorMessage} role="alert">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="Full Name"
                className={styles.formInput}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              {errors.fullName && (
                <div className={styles.errorMessage}>{errors.fullName}</div>
              )}
            </div>

            {verificationMethod === 'email' ? (
              <div className={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <div className={styles.errorMessage}>{errors.email}</div>
                )}
              </div>
            ) : (
              <div className={styles.formGroup}>
                <div className={styles.phoneGroup}>
                  <span className={styles.countryCode}>
                    <img src={NigeriaFlag} alt="NG" />
                    <span>+234</span>
                  </span>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className={`${styles.formInput} ${styles.phoneInput}`}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ''))
                    }
                    required
                  />
                </div>
                {errors.phone && (
                  <div className={styles.errorMessage}>{errors.phone}</div>
                )}
              </div>
            )}

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  className={styles.formInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {passwordVisible ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {errors.password && (
                <div className={styles.errorMessage}>{errors.password}</div>
              )}
            </div>

            <div className="text-center mb-4">
              <button
                type="button"
                onClick={toggleVerificationMethod}
                className="text-sm text-gray-600 hover:text-green-600"
              >
                Use {verificationMethod === 'email' ? 'phone number' : 'email'}{' '}
                instead
              </button>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <div className={styles.socialLogin}>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialSignup('Google')}
              aria-label="Sign up with Google"
            >
              <FaGoogle />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialSignup('Facebook')}
              aria-label="Sign up with Facebook"
            >
              <FaFacebook />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialSignup('Twitter')}
              aria-label="Sign up with Twitter"
            >
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
