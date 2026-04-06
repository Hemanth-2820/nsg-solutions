import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Briefcase, TrendingUp, Brain, Shield, Layout, Zap, CheckCircle } from 'lucide-react';

const EnterpriseStrategyPage = () => {
  const [subServices, setSubServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/get_services.php');
        const result = await response.json();
        
        if (result.status === 'success') {
          const cat = result.data.main.find(m => m.category_key === 'enterprise');
          if (cat && result.data.sub[cat.id]) {
            setSubServices(result.data.sub[cat.id]);
          } else {
            setSubServices([
              { title: "Corporate Consulting", icon: "Briefcase" },
              { title: "Business Modeling", icon: "TrendingUp" },
              { title: "Strategic Transformation", icon: "Brain" }
            ]);
          }
        }
      } catch (err) {
        console.error("Failed to load strategy services:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getDynamicIcon = (iconName) => {
    const Icon = LucideIcons[iconName] || LucideIcons.Briefcase;
    return <Icon size={30} />;
  };

  const cardStyles = [
    "bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200",
    "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200",
    "bg-gradient-to-br from-indigo-100 to-indigo-50 border-indigo-200"
  ];

  const iconStyles = [
    "bg-slate-700 text-white",
    "bg-blue-600 text-white",
    "bg-indigo-600 text-white"
  ];

  const hoverGlow = [
    "hover:shadow-slate-300/50",
    "hover:shadow-blue-300/50",
    "hover:shadow-indigo-300/50"
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE]">

      {/* HERO */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-slate-300 blur-[120px] opacity-30"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition"
          >
            <ArrowLeft size={14} /> Back to Services
          </Link>

          <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold text-[#0f172a] mb-6 tracking-tight">
            Enterprise Strategy
          </h1>

          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa] mb-8"></div>

          <p className="text-[#475569] text-[1.2rem] max-w-2xl border-l-[4px] border-[#007cc3] pl-6 leading-relaxed">
            Corporate business architecture & consulting — designed to architect,
            transform, and future-proof your enterprise.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subServices.map((item, i) => {
                const styleIdx = i % cardStyles.length;

                return (
                  <motion.div
                    key={item.id || i}
                    whileHover={{ y: -10, scale: 1.03 }}
                    onClick={() => {
                        const slug = item.title.replace(/[\s/]+/g, '-').toLowerCase();
                        navigate(`/solutions/enterprise/register/${slug}`);
                    }}
                    className={`
                      group relative h-[220px] rounded-2xl flex flex-col items-center justify-center text-center
                      border shadow-md
                      transition-all duration-500 cursor-pointer
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

export default EnterpriseStrategyPage;