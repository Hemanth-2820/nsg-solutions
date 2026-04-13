import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Zap } from 'lucide-react';

const DynamicServicePage = () => {
  const { serviceKey } = useParams();
  const [mainService, setMainService] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize icon names
  const getDynamicIcon = (iconName) => {
    if (!iconName) return <LucideIcons.Zap size={30} />;
    const pascalName = iconName
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    const Icon = LucideIcons[pascalName] || LucideIcons[iconName] || LucideIcons.Zap;
    return <Icon size={30} />;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/get_services.php?v=' + Date.now());
        const result = await response.json();
        
        if (result.status === 'success') {
          // Find the category matching the URL (e.g. /services/blockchain)
          // We check category_key but also handle common renames (like creative -> videoproduction)
          const category = result.data.main.find(m => 
            m.category_key === serviceKey || 
            (serviceKey === 'creative' && m.category_key === 'videoproduction') ||
            (serviceKey === 'it' && m.category_key === 'itservices')
          );

          if (category) {
            setMainService(category);
            setSubServices(result.data.sub[category.id] || []);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic service:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [serviceKey]);

  if (!isLoading && !mainService) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-[#F8FAFC]">
        <h2 className="text-4xl font-black uppercase italic text-slate-200 mb-4 tracking-tighter">Sector Not Found</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-8">The requested service node is not registered in the matrix.</p>
        <Link to="/services" className="px-8 py-4 bg-[#007cc3] text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl hover:scale-105">Back to Services</Link>
      </div>
    );
  }

  const cardStyles = [
    "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200",
    "bg-gradient-to-br from-violet-100 to-violet-50 border-violet-200",
    "bg-gradient-to-br from-emerald-100 to-emerald-50 border-emerald-200",
    "bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200",
    "bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200",
    "bg-gradient-to-br from-cyan-100 to-cyan-50 border-cyan-200",
    "bg-gradient-to-br from-rose-100 to-rose-50 border-rose-200"
  ];

  const iconStyles = [
    "bg-blue-600 text-white",
    "bg-violet-600 text-white",
    "bg-emerald-600 text-white",
    "bg-orange-500 text-white",
    "bg-indigo-600 text-white",
    "bg-cyan-600 text-white",
    "bg-rose-600 text-white"
  ];

  const hoverGlow = [
    "hover:shadow-blue-300/60",
    "hover:shadow-violet-300/60",
    "hover:shadow-emerald-300/60",
    "hover:shadow-orange-300/60",
    "hover:shadow-indigo-300/60",
    "hover:shadow-cyan-300/60",
    "hover:shadow-rose-300/60"
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE]">
      {/* HERO */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-blue-200 blur-[120px] opacity-30"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition"
          >
            <ArrowLeft size={14} /> Back to Services
          </Link>

          <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold text-[#0f172a] mb-6 tracking-tight">
            {mainService?.title || 'Service Sector'}
          </h1>

          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa] mb-8"></div>

          <p className="text-[#475569] text-[1.2rem] max-w-2xl border-l-[4px] border-[#007cc3] pl-6 leading-relaxed">
            {mainService?.description || 'Engineered for reliability, designed for global scale.'}
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#007cc3] border-t-transparent rounded-full animate-spin"></div>
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
                      border shadow-md transition-all duration-500
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
              {subServices.length === 0 && (
                <div className="col-span-full py-20 text-center text-slate-300 font-black uppercase tracking-widest italic opacity-50">Discovery processing — no offerings registered yet.</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DynamicServicePage;
