import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CapabilitiesSection from '../components/home/CapabilitiesSection';
import AboutMNCLevel from '../components/home/AboutMNCLevel';
import InsightsSection from '../components/home/InsightsSection';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <CapabilitiesSection />
      <AboutMNCLevel />
      <InsightsSection />
    </div>
  );
};

export default HomePage;
