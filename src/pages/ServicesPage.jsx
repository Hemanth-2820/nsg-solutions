import React from "react";
import { Routes, Route } from "react-router-dom";
import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import ServicePartners from "../components/services/ServicePartners";
import ServicesCTA from "../components/services/ServicesCTA";
import PageWrapper from "../components/services/PageWrapper";
import SectionWrapper from "../components/services/SectionWrapper";

// Service Sub-Pages
import ITServicesPage from "./services/ITServicesPage";
import VideoProductionPage from "./services/VideoProductionPage";
import DigitalMarketingPage from "./services/DigitalMarketingPage";
import EnterpriseStrategyPage from "./services/EnterpriseStrategyPage";
import BrandingDesignPage from "./services/BrandingDesignPage";
import DynamicServicePage from "./services/DynamicServicePage";

const ServicesIndex = () => {
  return (
    <div className="min-h-screen font-sans bg-[#f5f7fa]">
      <SectionWrapper>
        <ServicesHero
          title="Our Core Services"
          subtitle="Comprehensive end-to-end digital solutions designed to propel your business forward globally. Engineered for scale, secured for the future."
        />
      </SectionWrapper>

      <SectionWrapper>
        <ServicesGrid />
      </SectionWrapper>

      <SectionWrapper>
        <ServicePartners />
      </SectionWrapper>

      <SectionWrapper>
        <ServicesCTA />
      </SectionWrapper>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <PageWrapper>
      <Routes>
        <Route index element={<ServicesIndex />} />
        <Route path="it" element={<ITServicesPage />} />
        <Route path="creative" element={<VideoProductionPage />} />
        <Route path="marketing" element={<DigitalMarketingPage />} />
        <Route path="enterprise" element={<EnterpriseStrategyPage />} />
        <Route path="branding" element={<BrandingDesignPage />} />
        {/* Catch-all for any other service added via Admin Panel */}
        <Route path=":serviceKey" element={<DynamicServicePage />} />
      </Routes>
    </PageWrapper>
  );
};

export default ServicesPage;