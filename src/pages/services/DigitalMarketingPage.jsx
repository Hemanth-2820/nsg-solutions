import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, TrendingUp, Megaphone, Target, Globe, BarChart, Smartphone } from 'lucide-react';

const DigitalMarketingPage = () => {
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/get_services.php');
        const result = await response.json();
        
        if (result.status === 'success') {
          const cat = result.data.main.find(m => m.category_key === 'digitalmarketing');
          if (cat && result.data.sub[cat.id]) {
            setSubServices(result.data.sub[cat.id]);
          } else {
            setSubServices([
              { title: "Brand Building", icon: "TrendingUp" },
              { title: "Social Media Marketing", icon: "Megaphone" },
              { title: "Performance Marketing", icon: "BarChart" }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to load marketing services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getDynamicIcon = (iconName) => {
    if (!iconName) return <LucideIcons.Target size={30} />;
    const pascalName = iconName.split(/[-_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    const Icon = LucideIcons[pascalName] || LucideIcons[iconName] || LucideIcons.Target;
    return <Icon size={30} />;
  };

  const cardStyles = [
    "bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200",
    "bg-gradient-to-br from-violet-100 to-violet-50 border-violet-200",
    "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200",
    "bg-gradient-to-br from-rose-100 to-rose-50 border-rose-200"
  ];

  const iconStyles = [
    "bg-pink-600 text-white",
    "bg-violet-600 text-white",
    "bg-blue-600 text-white",
    "bg-rose-600 text-white"
  ];

  const hoverGlow = [
    "hover:shadow-pink-300/60",
    "hover:shadow-violet-300/60",
    "hover:shadow-blue-300/60",
    "hover:shadow-rose-300/60"
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE]">

      {/* HERO */}
      <section className="pt-[180px] pb-20 relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-pink-200 blur-[120px] opacity-30"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition"
          >
            <ArrowLeft size={14} /> Back to Services
          </Link>

          <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold text-[#0f172a] mb-6 tracking-tight">
            Digital Marketing
          </h1>

          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa] mb-8"></div>

          <p className="text-[#475569] text-[1.2rem] max-w-2xl border-l-[4px] border-[#007cc3] pl-6 leading-relaxed">
            Grow your digital presence — data-driven marketing strategies engineered
            to scale brands in the modern digital landscape.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
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

export default DigitalMarketingPage;