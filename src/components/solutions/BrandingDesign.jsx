import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ClipboardCheck, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const brandingProjects = [
  {
    id: 1,
    title: 'Corporate Identity Suite',
    shortDesc: 'Complete brand DNA construction.',
    desc: 'We build comprehensive visual identities that resonate with your target audience, including logo design, typography systems, and core color palettes that define your global presence.',
    features: ['Custom Logo Typography', 'Brand Guidelines Handbook', 'Digital Iconography Systems'],
    img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80'
  },
  {
    id: 2,
    title: 'UI/UX Design Frameworks',
    shortDesc: 'Scalable product design systems.',
    desc: 'Crafting intuitive and aesthetically superior digital interfaces that prioritize user experience while maintaining a consistent and professional brand aesthetic across all platforms.',
    features: ['Component Design Libraries', 'Interactive Wireframing', 'Accessibility Compliance'],
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&q=80'
  },
  {
    id: 3,
    title: 'Modern Brand Refresh',
    shortDesc: 'Revitalizing legacy institutions.',
    desc: 'Transforming established brands into modern market leaders through tactical design updates that maintain heritage while embracing contemporary visual trends.',
    features: ['Heritage Preservation Design', 'Social Media Visual kits', 'Motion Graphics Identity'],
    img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80'
  }
];

const BrandingDesign = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();

    const handleNavigation = (direction) => {
      if (isNavigated) return;
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions/itservices'); // Loop back
      if (direction === 'prev') navigate('/solutions/digitalmarketing');
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
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=2000&q=80"
          alt="Branding & Design"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold text-white mb-6 font-sans tracking-tight drop-shadow-2xl">
            Branding & Design
          </h1>
          <div className="w-24 h-1.5 bg-[#5bb8e4] mx-auto rounded-full mb-8 shadow-glow"></div>
        </div>
      </div>

      {/* Project Cards Grid Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-[2.5rem] md:text-[3.2rem] font-bold text-[#111] tracking-tight font-sans">Creative Solutions</h2>
          <div className="w-16 h-1 bg-[#1e3a8a] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {brandingProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/solutions/branding/register/${project.title.replace(/[\s/]+/g, '-').toLowerCase()}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-2xl cursor-pointer transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-bold uppercase tracking-widest text-xs border border-white/40 px-6 py-3 rounded-full backdrop-blur-sm transition-all transform translate-y-4 group-hover:translate-y-0">
                    Explore Solution
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#111] mb-3 group-hover:text-[#1e3a8a] transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {project.shortDesc}
                </p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#1e3a8a] font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                    Register Inquiry <ArrowRight size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#1e3a8a]/10 group-hover:text-[#1e3a8a] transition-all">
                    <ClipboardCheck size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingDesign;
