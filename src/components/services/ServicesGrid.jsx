import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesGrid = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/get_services.php');
        const result = await response.json();
        if (result.status === 'success') {
          setServices(result.data.main || []);
        }
      } catch (err) {
        console.error("Grid fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getPath = (service) => {
    const key = service.category_key;
    if (key === 'publishing') return 'https://nsgpublishers.com';
    if (key === 'itservices') return '/services/it';
    if (key === 'videoproduction') return '/services/creative';
    if (key === 'digitalmarketing') return '/services/marketing';
    if (key === 'branding') return '/services/branding';
    if (key === 'enterprise') return '/services/enterprise';
    return `/services/${key}`;
  };

  return (
    <section className="relative py-16 md:py-32 bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] text-[#0f172a] overflow-hidden">
 
       {/* Softer Grid Background */}
       <div className="absolute inset-0 opacity-10">
         <div className="w-full h-full bg-[radial-gradient(circle,#94a3b8_1px,transparent_1px)] bg-[size:50px_50px]" />
       </div>
 
       <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10 font-sans">
 
         {/* Section Heading */}
         <div className="mb-12 md:mb-24 flex items-center gap-6">
           <div className="w-12 md:w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa]"></div>
           <span className="text-[#007cc3] font-black tracking-[0.3em] uppercase text-[11px] md:text-[13px]">
             Our Capabilities Matrix
           </span>
         </div>
 
         {/* Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#007cc3] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            services.map((service, index) => {
              const path = getPath(service);
              const isExternal = path.startsWith('http');

              return (
                <motion.div
                  key={service.id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  onClick={() => {
                    if (isExternal) {
                      window.open(path, "_blank");
                    } else {
                      navigate(path);
                    }
                  }}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-[2rem] overflow-hidden transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,124,195,0.15)]"
                >
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden">
                    <img
                      src={service.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.5s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    {/* Tag */}
                    <span className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow border border-gray-200 text-[#0f172a]">
                      {service.tag || "CORE"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-[1.5rem] font-bold mb-4 group-hover:text-[#007cc3] transition-colors leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-[0.95rem] leading-relaxed font-light line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-6 flex items-center text-[#007cc3] font-bold text-xs tracking-widest uppercase gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300">
                      Explore Details <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;