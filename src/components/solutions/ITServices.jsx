import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ClipboardCheck, MessageSquare } from 'lucide-react';
import ProjectInquiryForm from '../common/ProjectInquiryForm';

const itProjects = [
  {
    id: 1,
    title: 'AI Farming Assistant Chatbot',
    shortDesc: 'Intelligent crop & yield guidance.',
    desc: 'An AI-powered conversational agent designed specifically for the agricultural sector, delivering real-time actionable insights to farmers on modern crop management and pest control.',
    features: ['Multi-lingual NLP engine', 'Weather & Soil sensor integration', 'Real-time pest diagnosis via image recognition'],
    useCases: ['Rural crop advisory', 'Automated supply chain ordering', 'Government agricultural subsidies guidance'],
    img: 'https://images.unsplash.com/photo-1592982537447-6f2da3c6fe60?w=800&q=80'
  },
  {
    id: 2,
    title: 'MBA Portal',
    shortDesc: 'Comprehensive academic management system.',
    desc: 'A robust, centralized portal unifying student records, course materials, alumni networking, and placement tracking for leading MBA institutions.',
    features: ['Live assignment tracking', 'Alumni directory & networking hub', 'Integrated webinar capabilities'],
    useCases: ['University campus administration', 'Corporate placement matching', 'Student lifecycle management'],
    img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80'
  },
  {
    id: 3,
    title: 'EduQuiz',
    shortDesc: 'Gamified learning assessment platform.',
    desc: 'A highly scalable, real-time quiz application offering interactive assessments to students while generating deep performance analytics for educators.',
    features: ['Real-time multiplayer leaderboards', 'Adaptive difficulty engine', 'Automated grading analytics'],
    useCases: ['K-12 remote learning', 'Corporate training programs', 'Standardized test preparation'],
    img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80'
  },
  {
    id: 4,
    title: 'Smart Classroom',
    shortDesc: 'IoT-enabled educational environments.',
    desc: 'An integrated hardware and software solution that brings modern IoT tools into the classroom, making education highly interactive and immersive.',
    features: ['Interactive smartboard syncing', 'Automated attendance via facial recognition', 'Lecture recording & indexing'],
    useCases: ['Modern university lecture halls', 'Hybrid classrooms', 'Accessible learning environments'],
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
  },
  {
    id: 5,
    title: 'Preventive Healthcare',
    shortDesc: 'Predictive health monitoring dashboard.',
    desc: 'A data-driven analytics platform aggregating patient biometrics to predict potential health risks, facilitating proactive medical interventions before crises occur.',
    features: ['Wearable device integrations', 'Machine Learning predictive risk models', 'Telehealth consultation scheduling'],
    useCases: ['Hospital patient monitoring', 'Elderly care tracking', 'Corporate wellness initiatives'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?w=800&q=80'
  },
  {
    id: 6,
    title: 'EAMCET Platform',
    shortDesc: 'High-concurrency exam engine.',
    desc: 'A highly optimized, zero-latency testing platform specifically built to handle massive concurrent loads during state-level engineering and medical entrance examinations.',
    features: ['Anti-cheat browser lockdown', 'Zero-latency question delivery', 'Automated scaling infrastructure'],
    useCases: ['State-level entrance exams', 'Massive open online assessments', 'Secure government evaluations'],
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80'
  },
  {
    id: 7,
    title: 'Realtors Media',
    shortDesc: 'Immersive property showcasing hub.',
    desc: 'A dynamic multi-media platform for real estate agencies, featuring 3D virtual tours, high-definition real estate tracking, and direct agent communication.',
    features: ['3D WebGL virtual property tours', 'Automated lead generation CRM', 'Dynamic neighborhood mapping'],
    useCases: ['Luxury real estate listings', 'Commercial property leasing', 'Remote property investments'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
  }
];

const ITServices = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    // If a modal is open, disable swipe routing to prevent accidents while reading
    if (selectedProject) return;

    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();

    const handleNavigation = (direction) => {
      if (isNavigated) return;
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions/videoproduction');
      if (direction === 'prev') navigate('/solutions');
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
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=2000&q=80"
          alt="IT Services"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold text-white mb-6 font-sans tracking-tight drop-shadow-2xl">
            IT Services
          </h1>
          <div className="w-24 h-1.5 bg-[#5bb8e4] mx-auto rounded-full mb-8 shadow-glow"></div>
        </div>
      </div>

      {/* Dynamic Project Cards Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3.2rem] font-bold text-[#111] tracking-tight font-sans">Featured Deliverables</h2>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {itProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/solutions/itservices/register/${project.title.replace(/\s+/g, '-').toLowerCase()}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl cursor-pointer transition-all duration-300 group border border-gray-100 flex flex-col items-center"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{project.shortDesc}</p>
                <div className="text-[#007cc3] font-bold tracking-widest text-[11px] uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                  View Project Details <ArrowRight size={14} strokeWidth={2.5} />
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
              className={`relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-[0_100px_150px_rgba(0,0,0,0.6)] z-10 flex flex-col ${!showInquiry ? 'md:flex-row' : ''} max-h-[85vh] border border-white/20`}
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
                  {/* Modal Image Half */}
                  <div className="w-full md:w-2/5 min-h-[300px] md:min-h-full relative overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={selectedProject.img} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e27]/40 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 z-10">
                      <span className="bg-[#1baade] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl">Deliverable</span>
                    </div>
                  </div>

                  {/* Modal Content Half */}
                  <div className="w-full md:w-3/5 p-12 md:p-14 bg-white overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-[2px] bg-[#1baade]"></div>
                      <span className="text-[#1baade] font-bold tracking-[0.3em] text-[11px] uppercase">IT Services Portfolio</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#0a0e27] mb-8 tracking-tighter leading-tight font-sans italic">{selectedProject.title}</h2>
                    <p className="text-gray-600 text-[1.1rem] leading-relaxed mb-10 font-light italic">"{selectedProject.desc}"</p>

                    <div className="space-y-10">
                      <div>
                        <h4 className="flex items-center gap-3 text-[#0a0e27] font-black uppercase tracking-widest text-[0.8rem] mb-6">
                          <ClipboardCheck size={20} className="text-[#1baade]" /> Key Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1baade]/30 transition-all group">
                              <span className="w-2 h-2 rounded-full bg-[#1baade] mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></span>
                              <span className="text-gray-700 font-medium text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8 border-t border-gray-100 flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                          <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Ready to transform?</h4>
                          <h3 className="text-2xl font-black text-[#0a0e27]">Interested in this solution?</h3>
                        </div>

                        <button
                          onClick={() => setShowInquiry(true)}
                          className="group w-full max-w-sm bg-[#1baade] text-white py-5 px-10 rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-between hover:bg-[#0a0e27] transition-all duration-500 shadow-2xl shadow-[#1baade]/30"
                        >
                          Start Project Inquiry <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
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

      {/* Custom Scrollbar Styles for the Modal */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}} />
    </div>
  );
};

export default ITServices;
