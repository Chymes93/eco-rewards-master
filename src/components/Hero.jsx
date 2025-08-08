import React from 'react';
import './Hero.css';
import { QrCode, Gift, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section hero-background">
      <div className="hero-content font-poppins">
        <h1 className="hero-title font-semibold">
          Turn Your Everyday Actions into <br />
          <strong>REWARDS</strong>
        </h1>
        <p className="hero-subtitle font-semibold">
          Earn Points, Save the Planet & Get Exclusive Perks
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
        <p className="hero-user-count">Join 50,000+ eco-conscious users!</p>
      </div>
      <div className="hero-features">
        <div className="feature-box mt-11">
          <QrCode size={48} color="white" />
          <p>Scan the QR code on eco-friendly products to grab points</p>
        </div>
        <div className="feature-box mt-11">
          <Gift size={48} color="white" />
          <p>Make green choices, stack up eco-points, and level up</p>
        </div>
        <div className="feature-box mt-11">
          <Smile size={48} color="white" /> 
          <p>Turn your points into discounts, cashback, and cool rewards</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;



