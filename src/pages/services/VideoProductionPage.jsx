import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Video, Film, Megaphone, Camera, Play, Monitor, Music } from 'lucide-react';

const VideoProductionPage = () => {
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/get_services.php');
        const result = await response.json();
        
        if (result.status === 'success') {
          const cat = result.data.main.find(m => m.category_key === 'videoproduction');
          if (cat && result.data.sub[cat.id]) {
            setSubServices(result.data.sub[cat.id]);
          } else {
            setSubServices([
              { title: "Corporate Films", icon: "Video" },
              { title: "Ad Films", icon: "Film" },
              { title: "Short Films", icon: "Film" },
              { title: "Product Films", icon: "Video" },
              { title: "Promotional Videos", icon: "Megaphone" }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to load video services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getDynamicIcon = (iconName) => {
    if (!iconName) return <LucideIcons.Video size={30} />;
    const pascalName = iconName.split(/[-_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    const Icon = LucideIcons[pascalName] || LucideIcons[iconName] || LucideIcons.Video;
    return <Icon size={30} />;
  };

  const cardStyles = [
    "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200",
    "bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200",
    "bg-gradient-to-br from-rose-100 to-rose-50 border-rose-200",
    "bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200",
    "bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200"
  ];

  const iconStyles = [
    "bg-purple-600 text-white",
    "bg-pink-600 text-white",
    "bg-rose-600 text-white",
    "bg-orange-500 text-white",
    "bg-indigo-600 text-white"
  ];

  const hoverGlow = [
    "hover:shadow-purple-300/60",
    "hover:shadow-pink-300/60",
    "hover:shadow-rose-300/60",
    "hover:shadow-orange-300/60",
    "hover:shadow-indigo-300/60"
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE]">

      {/* HERO */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-purple-200 blur-[120px] opacity-30"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition"
          >
            <ArrowLeft size={14} /> Back to Services
          </Link>

          <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold text-[#0f172a] mb-6 tracking-tight">
            Video Production
          </h1>

          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa] mb-8"></div>

          <p className="text-[#475569] text-[1.2rem] max-w-2xl border-l-[4px] border-[#007cc3] pl-6 leading-relaxed">
            High-quality storytelling — from corporate narratives to digital advertisements.
            We bring your vision to life with cinematic precision.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subServices.map((item, i) => {
                const styleIdx = i % cardStyles.length;

                return (
                  <motion.div
                    key={item.id || i}
                    whileHover={{ y: -12, scale: 1.04 }}
                    className={`
                      group relative h-[230px] rounded-2xl flex flex-col items-center justify-center text-center
                      border shadow-md
                      transition-all duration-500
                      ${cardStyles[styleIdx]} ${hoverGlow[styleIdx]}
                    `}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/30 blur-2xl"></div>
                    <div className={`
                      relative z-10 mb-5 p-5 rounded-xl transition group-hover:scale-110
                      ${iconStyles[styleIdx]}
                    `}>
                      {getDynamicIcon(item.icon)}
                    </div>
                    <h4 className="relative z-10 text-[1.2rem] font-bold text-[#0f172a] group-hover:text-black transition px-4 leading-tight uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#007cc3] to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VideoProductionPage;