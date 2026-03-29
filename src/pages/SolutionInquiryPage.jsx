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
        
        // Lookup project in registry
        const category = service.toLowerCase().replace('services', '');
        const projectData = allProjectsData[service.toLowerCase()]?.find(
          p => p.title.toLowerCase() === cleanName.toLowerCase()
        );
        setProjectDetails(projectData);
    }
  }, [project, service]);

  return (
    <div className="min-h-screen bg-[#0a0e27] pt-32 pb-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1baade] hover:text-white transition-colors group mb-12 ml-4 md:ml-0"
        >
          <div className="w-10 h-10 rounded-full border border-[#1baade]/30 flex items-center justify-center group-hover:bg-[#1baade]/10 group-hover:border-[#1baade] transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="font-bold uppercase tracking-widest text-[11px]">Return to {service?.replace('services', ' Services')}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Project Overview */}
          <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-8"
             >
                <div className="space-y-4">
                  <p className="text-[#1baade] font-black tracking-[0.4em] uppercase text-[10px]">Inquiry Module</p>
                  <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                    {projectDetails?.title || decodedProjectName}
                  </h1>
                </div>

                <div className="relative rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-black/50 aspect-video md:aspect-auto">
                   <img 
                     src={projectDetails?.img || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80'} 
                     alt={decodedProjectName} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="space-y-6 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-md">
                   <h3 className="text-white font-bold text-xl flex items-center gap-3">
                      <Zap size={20} className="text-[#1baade]" /> Project Overview
                   </h3>
                   <p className="text-gray-400 leading-relaxed font-light text-lg">
                      {projectDetails?.desc || "Experience excellence with our state-of-the-art enterprise solutions, designed to scale and optimize your business workflows."}
                   </p>
                   
                   <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      <div className="space-y-1">
                         <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Service Line</p>
                         <p className="text-white text-sm font-bold capitalize">{service?.replace('services', ' Services')}</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <p className="text-[10px] uppercase font-black tracking-widest text-gray-500">Deployment</p>
                         <p className="text-white text-sm font-bold">Standard</p>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8 px-4 opacity-50">
                   <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest"><ShieldCheck size={14} /> Secured</div>
                   <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest"><Clock size={14} /> 24h Response</div>
                </div>
             </motion.div>
          </div>

          {/* Right Column: Inquiry Registry */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] overflow-hidden shadow-[0_100px_150px_rgba(0,0,0,0.4)] relative"
            >
              <ProjectInquiryForm 
                projectName={decodedProjectName} 
                onClose={() => navigate(-1)} 
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Atmospheric backgrounds */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[150px]"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#1baade]/10 blur-[150px]"></div>
      </div>
    </div>
  );
};

export default SolutionInquiryPage;
