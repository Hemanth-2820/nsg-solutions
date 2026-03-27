import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CareersHero from "../components/careers/CareersHero";
import CareersStats from "../components/careers/CareersStats";
import CareersBenefits from "../components/careers/CareersBenefits";
import CareersRoles from "../components/careers/CareersRoles";
import CareersCTA from "../components/careers/CareersCTA";
import CareersApplyPage from "./CareersApplyPage";
import CareersWhyJoin from "../components/careers/CareersWhyJoin";
import CareersWork from "../components/careers/CareersWork";
import CareersLife from "../components/careers/CareersLife";
import CareersProcess from "../components/careers/CareersProcess";
import CareersTestimonials from "../components/careers/CareersTestimonials";

const CareersIndex = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] text-black font-sans">
      <CareersHero />
      <CareersStats />
      <CareersWhyJoin />
      <CareersWork />
      <CareersLife />
      <CareersBenefits />
      <CareersRoles />
      <CareersProcess />
      <CareersTestimonials />
      <CareersCTA />
    </div>
  );
};

const CareersPage = () => {
  return (
    <Routes>
      <Route index element={<CareersIndex />} />
      <Route path="apply/:role" element={<CareersApplyPage />} />
    </Routes>
  );
};

export default CareersPage;