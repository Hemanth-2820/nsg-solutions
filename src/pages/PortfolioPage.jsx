import React from 'react';
import ProjectCard from '../components/portfolio/ProjectCard';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <div className="pt-10 md:pt-12 px-6 md:px-0">
        <ProjectCard />
      </div>
    </div>
  );
};

export default PortfolioPage;
