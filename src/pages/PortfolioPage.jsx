import React from 'react';
import ProjectCard from '../components/portfolio/ProjectCard';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen w-full relative" 
         style={{ background: 'linear-gradient(120grad, rgb(100, 57, 134), rgb(152, 174, 213))' }}>
      <div className="relative pt-10 md:pt-12 px-6 md:px-0">
        <ProjectCard />
      </div>
    </div>
  );
};

export default PortfolioPage;
