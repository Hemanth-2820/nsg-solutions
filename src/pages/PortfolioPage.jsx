import React from 'react';
import ProjectCard from '../components/portfolio/ProjectCard';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-32 px-6">
      <h1 className="text-4xl font-infosys-heading text-center text-[#111] mb-10">Our Portfolio (Developer 3: Build here)</h1>
      <ProjectCard />
    </div>
  );
};

export default PortfolioPage;
