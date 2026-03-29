import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ClipboardCheck, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectInquiryForm from '../common/ProjectInquiryForm';

const vpProjects = [
  {
    id: 1,
    title: 'Corporate Commercials',
    shortDesc: 'Cinematic brand storytelling.',
    desc: 'High-end film production that translates your corporate vision into a compelling cinematic experience, perfect for high-stakes brand launches.',
    features: ['4K Cinematic Production', 'Professional Scriptwriting', 'High-End Sound Design'],
    img: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80'
  },
  {
    id: 2,
    title: 'Character Animation',
    shortDesc: '2D & 3D character design.',
    desc: 'Breathtaking character-driven animations that simplify complex ideas and create emotional connections with your target audience.',
    features: ['Custom Rigging & Motion', 'Dynamic Voice Acting', 'Physics-Based VFX'],
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
  },
  {
    id: 3,
    title: '3D Product Reveals',
    shortDesc: 'Hyper-realistic product visuals.',
    desc: 'Cutting-edge 3D rendering that showcases your product in impossible environments, highlighting every detail with precision and style.',
    features: ['Photorealistic Rendering', 'Exploded View Animations', 'Interactive Web Components'],
    img: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&q=80'
  }
];

const VideoProduction = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    if (selectedProject) return;
    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();

    const handleNavigation = (direction) => {
      if (isNavigated) return;
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions/digitalmarketing');
      if (direction === 'prev') navigate('/solutions/itservices');
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) handleNavigation('next');
        else handleNavigation('prev');
      }
    };

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) handleNavigation('next');
      else if (touchEndX > touchStartX + 50) handleNavigation('prev');
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate, selectedProject]);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=2000&q=80"
          alt="Video Production"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold text-white mb-6 font-sans tracking-tight drop-shadow-2xl">
            Video Production
          </h1>
          <div className="w-24 h-1.5 bg-[#5bb8e4] mx-auto rounded-full mb-8 shadow-glow"></div>
        </div>
      </div>

      {/* Project Cards Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3.2rem] font-bold text-[#111] tracking-tight font-sans">Cinematic Deliverables</h2>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vpProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/solutions/videoproduction/register/${project.title.replace(/[\s/]+/g, '-').toLowerCase()}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl cursor-pointer transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{project.shortDesc}</p>
                <div className="text-[#007cc3] font-bold tracking-widest text-[11px] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                  Register Inquiry <ArrowRight size={14} strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal Popup */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedProject(null); setShowInquiry(false); }}
              className="absolute inset-0 bg-[#0a0e27]/90 backdrop-blur-xl cursor-pointer"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-2xl z-10 flex flex-col ${!showInquiry ? 'md:flex-row' : ''} max-h-[85vh] border border-white/20`}
            >
              <button
                onClick={() => { setSelectedProject(null); setShowInquiry(false); }}
                className="absolute top-8 right-8 w-12 h-12 bg-white shadow-2xl hover:bg-[#1baade] hover:text-white text-[#0a0e27] rounded-full flex items-center justify-center z-30 transition-all active:scale-95"
              >
                <X size={24} />
              </button>

              {showInquiry ? (
                <ProjectInquiryForm
                  projectName={selectedProject.title}
                  onClose={() => { setSelectedProject(null); setShowInquiry(false); }}
                />
              ) : (
                <>
                  <div className="w-full md:w-2/5 min-h-[300px] md:min-h-full relative overflow-hidden bg-gray-100">
                    <img src={selectedProject.img} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e27]/40 to-transparent"></div>
                  </div>
                  <div className="w-full md:w-3/5 p-12 md:p-14 bg-white overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-[2px] bg-[#1baade]"></div>
                      <span className="text-[#1baade] font-bold tracking-[0.3em] text-[11px] uppercase">Production Deliverable</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0a0e27] mb-8 tracking-tighter leading-tight font-sans italic">{selectedProject.title}</h2>
                    <p className="text-gray-600 text-[1.1rem] leading-relaxed mb-10 font-light italic">"{selectedProject.desc}"</p>

                    <div className="space-y-10">
                      <div>
                        <h4 className="flex items-center gap-3 text-[#0a0e27] font-black uppercase tracking-widest text-[0.8rem] mb-6">
                          <ClipboardCheck size={20} className="text-[#1baade]" /> Project Highlights
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1baade]/30 transition-all group">
                              <span className="w-2 h-2 rounded-full bg-[#1baade] mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700 font-medium text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8 border-t border-gray-100 flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Ready to film?</h4>
                          <h3 className="text-2xl font-black text-[#0a0e27]">Start this production?</h3>
                        </div>

                        <button
                          onClick={() => setShowInquiry(true)}
                          className="group w-full max-w-sm bg-[#1baade] text-white py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-between hover:bg-[#0a0e27] transition-all duration-500 shadow-2xl shadow-[#1baade]/30"
                        >
                          Request Production <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoProduction;
