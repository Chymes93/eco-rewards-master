import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Auth.module.css';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, loading, authError, setAuthError } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
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
      await login({ email, password });
    }
  };

  const handleSocialLogin = (provider) => {
    // In a real app, this would integrate with social login providers
    alert(`${provider} login would be implemented here`);
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
          <h2 className={styles.authTitle}>Login</h2>
          <p className={styles.authSubtitle}>
            Don't have an account?{' '}
            <Link to="/signup" className={styles.authLink}>
              Sign Up
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

            <div className="flex justify-end mb-4">
              <Link to="/forgot-password" className={styles.authLink}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <div className={styles.socialLogin}>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin('Google')}
              aria-label="Login with Google"
            >
              <FaGoogle />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin('Facebook')}
              aria-label="Login with Facebook"
            >
              <FaFacebook />
            </button>
            <button
              className={styles.socialButton}
              onClick={() => handleSocialLogin('Twitter')}
              aria-label="Login with Twitter"
            >
              <FaXTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
