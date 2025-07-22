import React from 'react';
import Hero from './Hero';
import RewardsSection from './RewardsSection';
import SponsorsSection from './SponsorsSection';
import Testimonials from './Testimonials';
import Leaderboard from './Leaderboard';
import EcoPointsSection from './EcoPointsSection';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <RewardsSection />
      <SponsorsSection />
      <Testimonials />
      <Leaderboard />
      <EcoPointsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
