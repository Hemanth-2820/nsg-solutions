import CareersHero from "../components/careers/CareersHero";
import CareersStats from "../components/careers/CareersStats";
import CareersWhyJoin from "../components/careers/CareersWhyJoin";
import CareersWork from "../components/careers/CareersWork";
import CareersLife from "../components/careers/CareersLife";
import CareersBenefits from "../components/careers/CareersBenefits";
import CareersRoles from "../components/careers/CareersRoles";
import CareersProcess from "../components/careers/CareersProcess";
import CareersTestimonials from "../components/careers/CareersTestimonials";
import CareersCTA from "../components/careers/CareersCTA";

const CareersPage = () => {
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

export default CareersPage;