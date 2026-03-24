import React from 'react';
import CareersHero from '../components/careers/CareersHero';
import CareersJoinUs from '../components/careers/CareersJoinUs';
import CareersReasons from '../components/careers/CareersReasons';
import CareersPerks from '../components/careers/CareersPerks';
import CareersRoles from '../components/careers/CareersRoles';
import CareersTestimonials from '../components/careers/CareersTestimonials';

const CareersPage = () => (
  <div className="min-h-screen font-sans bg-white">
    <CareersHero />
    <CareersJoinUs />
    <CareersReasons />
    <CareersPerks />
    <CareersRoles />
    <CareersTestimonials />
  </div>
);

export default CareersPage;
