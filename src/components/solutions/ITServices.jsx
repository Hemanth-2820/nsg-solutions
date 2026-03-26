import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

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
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl cursor-pointer transition-all duration-300 group border border-gray-100 flex flex-col"
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
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-12 pt-28">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[75vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center z-20 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Modal Image Half */}
              <div className="w-full md:w-2/5 min-h-[250px] md:min-h-full relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={selectedProject.img} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </div>
              
              {/* Modal Content Half */}
              <div className="w-full md:w-3/5 p-8 md:p-12 bg-white overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-6 h-[2px] bg-[#5bb8e4]"></div>
                   <span className="text-[#5bb8e4] font-bold tracking-[0.2em] text-[10px] uppercase">IT Services Portfolio</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight font-sans">{selectedProject.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">{selectedProject.desc}</p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-[#1e3a8a] font-bold uppercase tracking-widest text-[11px] mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-4 text-gray-700 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#007cc3] mt-2.5 flex-shrink-0"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-[#1e3a8a] font-bold uppercase tracking-widest text-[11px] mb-4">Primary Use Cases</h4>
                    <ul className="space-y-3">
                      {selectedProject.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-start gap-4 text-gray-700 font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] mt-2.5 flex-shrink-0"></span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles for the Modal */}
      <style dangerouslySetInnerHTML={{__html: `
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
