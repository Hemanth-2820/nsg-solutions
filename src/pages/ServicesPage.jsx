import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServicesGrid from '../components/services/ServicesGrid';
import ServicePartners from '../components/services/ServicePartners';
import ServicesCTA from '../components/services/ServicesCTA';

const ServicesPage = () => {
  return (
    <div className="min-h-screen font-sans">
      <ServicesHero 
        title="Our Core Services" 
        subtitle="Comprehensive end-to-end digital solutions designed to propel your business forward globally. Engineered for scale, secured for the future." 
      />
      <ServicesGrid />
      <ServicePartners />
      <ServicesCTA />
    </div>
  );
};

export default ServicesPage;
