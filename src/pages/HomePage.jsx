import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AboutMNCLevel from '../components/home/AboutMNCLevel';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <AboutMNCLevel />
      <Testimonials />
    </div>
  );
};

export default HomePage;
