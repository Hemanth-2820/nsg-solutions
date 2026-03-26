import React from "react";
import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import ServicePartners from "../components/services/ServicePartners";
import ServicesCTA from "../components/services/ServicesCTA";
import PageWrapper from "../components/services/PageWrapper";
import SectionWrapper from "../components/services/SectionWrapper"; // ✅ NEW

const ServicesPage = () => {
  return (
    <PageWrapper>

      <div className="min-h-screen font-sans bg-[#f5f7fa]">

        {/* HERO */}
        <SectionWrapper>
          <ServicesHero 
            title="Our Core Services" 
            subtitle="Comprehensive end-to-end digital solutions designed to propel your business forward globally. Engineered for scale, secured for the future." 
          />
        </SectionWrapper>

        {/* GRID */}
        <SectionWrapper>
          <ServicesGrid />
        </SectionWrapper>

        {/* PARTNERS */}
        <SectionWrapper>
          <ServicePartners />
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper>
          <ServicesCTA />
        </SectionWrapper>

      </div>

    </PageWrapper>
  );
};

export default ServicesPage;