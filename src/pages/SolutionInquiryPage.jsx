import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, Zap } from 'lucide-react';
import ProjectInquiryForm from '../components/common/ProjectInquiryForm';
import { allProjectsData } from '../data/projectsRegistry';

const SolutionInquiryPage = () => {
  const { service, project } = useParams();
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState(null);
  const [decodedProjectName, setDecodedProjectName] = useState('');

  useEffect(() => {
    if (project && service) {
      const cleanName = decodeURIComponent(project.replace(/-/g, ' '));
      setDecodedProjectName(cleanName);

      // Improved Lookup project in registry with normalized name matching
      const serviceKey = service.toLowerCase();
      const projectData = allProjectsData[serviceKey]?.find(
        p => p.title.replace(/\s+/g, '-').toLowerCase() === project.toLowerCase() ||
          p.title.toLowerCase() === cleanName.toLowerCase()
      );
      setProjectDetails(projectData);
    }
  }, [project, service]);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-32 pb-20 px-4 md:px-0 relative overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1baade] hover:text-white transition mb-12"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold tracking-widest uppercase">
            Return to {service?.replace('services', ' Services')}
          </span>
        </button>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-8">

            <div>
              <p className="text-[#1baade] text-[10px] tracking-[0.4em] uppercase font-bold mb-4">
                Inquiry Module
              </p>

              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                {projectDetails?.title || decodedProjectName}
              </h1>
            </div>

            {/* IMAGE CARD */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
              <img
                src={projectDetails?.img || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200'}
                className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* INFO BOX */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-[#1baade]" />
                Project Overview
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {projectDetails?.desc || "Enterprise-grade solution designed to scale and optimize workflows."}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE (FORM) */}
          <div className="lg:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="
            bg-white/50 backdrop-blur-xl
            rounded-[2.5rem]
            p-8 md:p-12
            shadow-[0_50px_120px_rgba(0,0,0,0.35)]
            border border-white/50
          "
            >
              <ProjectInquiryForm
                projectName={decodedProjectName}
                onClose={() => navigate(-1)}
              />
            </motion.div>

          </div>

        </div>
      </div>

      {/* 🔥 PREMIUM BACKGROUND GLOW */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1baade]/20 blur-[120px] rounded-full"></div>

    </div>
  );
};

export default SolutionInquiryPage;
